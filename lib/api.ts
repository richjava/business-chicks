import { client } from "@/sanity/client";

const pagePromises: Record<string, Promise<unknown>> = {};

// Import JSON files directly
import pagesData from '@/public/data/pages.json';
import layoutData from '@/public/data/layout.json';
// removed unused global.json import

// Initialize settings
const pagesSettings = pagesData;
const layoutSettings = layoutData;

interface PropData {
  [key: string]: {
    data?: unknown;
    collections?: {
      [key: string]: unknown;
    };
    global?: unknown;
  };
}

interface GetPropDataConfig {
  type: "body" | "layout";
  pageName: string;
  pageData?: unknown;
  globalData?: unknown;
}

export interface PageProps {
  error?: {
    code: number;
    message: string;
  };
  contactSeoContent?: unknown;
  headerContent?: import('./types').HeaderProps['content'];
  footerContent?: import('./types').FooterProps['content'];
  // Contact page
  contactBannerContent?: import('./types').BannerProps['content'];
  contactContent?: import('./types').ContactFormProps['content'];
  // Home page
  homeLandingContent?: import('./types').HomeLandingProps['content'];
  mainCTAContent?: import('./types').MainCTAProps['content'];
  meetingsCTAContent?: import('./types').MeetingsCTAProps['content'];
  joinCTAContent?: import('./types').JoinCTAProps['content'];
  homeTestimonialsContent?: import('./types').TestimonialsSliderProps['content'];
  // Join page
  joinBannerContent?: import('./types').BannerProps['content'];
  membershipContent?: import('./types').MembershipProps['content'];
  requirementsContent?: import('./types').RequirementsProps['content'];
  joinTestimonialsContent?: import('./types').TestimonialsSliderProps['content'];
  // Our meetings page
  meetingsBannerContent?: import('./types').BannerProps['content'];
  meetingsInfoContent?: import('./types').InfoProps['content'];
  meetingsTestimonialsContent?: import('./types').TestimonialsSliderProps['content'];
  // Resources page
  resourcesBannerContent?: import('./types').BannerProps['content'];
  resourcesContent?: import('./types').ResourcesAccordionProps['content'];
  resourcesTestimonialsContent?: import('./types').TestimonialsSliderProps['content'];
  // Add other page-specific props as needed
}

export interface GetPropsConfig {
  pageName: string;
  articleSlug?: string;
  collectionName?: string;
  params?: unknown;
}

export async function getProps(config: GetPropsConfig): Promise<PageProps> {
  return new Promise(async (resolve) => {
    if (!config) {
      const message = "Error: No config object provided";
      console.error(message);
      return resolve({
        error: {
          code: 500,
          message: message,
        },
      });
    }
    if (!config.pageName) {
      const message = "Error: No pageName value provided";
      console.error(message);
      return resolve({
        error: {
          code: 500,
          message: message,
        },
      });
    }

    if (!pagesSettings) {
      const message =
        "Error: No page settings data found in public directory. Are you missing a data file?";
      console.error(message);
      return resolve({
        error: {
          code: 500,
          message: message,
        },
      });
    }
    if (!layoutSettings) {
      const message =
        "Error: No layout settings data found in public directory. Are you missing a data file?";
      console.error(message);
      return resolve({
        error: {
          code: 500,
          message: message,
        },
      });
    }

    const pageSettings = (pagesSettings as { pages: Record<string, { sections: Record<string, unknown> }> }).pages[config.pageName];
    if (!pageSettings) {
      const message = `Error: Page does not exist: ${config.pageName}`;
      console.warn(message);
      return resolve({
        error: {
          code: 500,
          message: message,
        },
      });
    }

    try {
      // Fetch global data
      const globalData = await client.fetch(`*[_type == "global"][0]`);

      // Fetch page data with section references
      const pageQuery = `*[_type == "${config.pageName}"][0]{
        sections[]{
          _type,
          _key,
          _ref
        }
      }`;
      
      const pageData = await client.fetch(pageQuery);
      
      // Fetch collections for sections
      await getSectionCollectionData({
        pageSettings: pageSettings,
        params: config.params,
      });
      
      // Create props structure
      const props: Record<string, unknown> = {};
      
      // Add global data to layout components
      if (globalData) {
        props.headerContent = { global: globalData, collections: {} };
        props.footerContent = { global: globalData, collections: {} };
      }
      
      // Process layout sections and add them to props
      const layoutSections = (layoutSettings as { layout: { sections: Array<{ name: string; expand?: unknown; collections?: Record<string, unknown> }> } }).layout.sections;
      if (Array.isArray(layoutSections)) {
        for (const section of layoutSections) {
          const pageName = camelize(section.name);
          const propName = pageName + "Content";
          
          // Wait for the layout section promise to resolve
          if (pageName && pageName in pagePromises) {
            const sectionData = await pagePromises[pageName];
            props[propName] = {
              data: sectionData,
              global: globalData,
              collections: {}
            };
          }
        }
      }
      
      if (pageData && pageData.sections) {
        // Fetch each referenced section individually
        for (const sectionRef of pageData.sections) {
          const sectionName = sectionRef._type;
          // Remove "Section" suffix if it exists to match component expectations
          const cleanSectionName = sectionName.replace('Section', '');
          
          // Get the section configuration from pages.json
          // Try to find the config by exact match first, then by partial match
          let sectionConfig = pageSettings.sections[cleanSectionName];
          if (!sectionConfig) {
            // Try to find by partial match (e.g., "about" might match "aboutSection")
            for (const configKey in pageSettings.sections) {
              if (cleanSectionName.includes(configKey) || configKey.includes(cleanSectionName)) {
                sectionConfig = pageSettings.sections[configKey];
                break;
              }
            }
          }
          
          let expandString = "";
          
          // Apply expand configuration if it exists
          const expandConfig = sectionConfig && (sectionConfig as Record<string, unknown>).expand;
          if (Array.isArray(expandConfig)) {
            // Handle empty expand arrays by treating them as "expand all fields"
            const processedExpand = expandConfig.map((field: { key: string; val: { expand?: unknown[] } | Record<string, never>; isMultiple?: boolean }) => {
              if (field?.val && Array.isArray(field.val.expand) && field.val.expand.length === 0) {
                // Empty expand array means expand all fields for this reference
                return {
                  ...field,
                  val: {} // Change from { expand: [] } to {} to expand all fields
                };
              }
              return field;
            });
            expandString = getExpand(processedExpand);
          }
          
          // Fetch section data with proper expansion
          const sectionQuery = `*[_id == "${sectionRef._ref}"][0]${expandString}`;
          const sectionData = await client.fetch(sectionQuery);
          
          const propName = cleanSectionName + "Content";
          props[propName] = {
            data: sectionData,
            global: globalData,
            collections: {}
          };
        }
      }
      
      // Add collections to sections
      for (const key in pagePromises) {
        if (pagePromises.hasOwnProperty(key)) {
          if (key.startsWith("section")) {
            const splitKeys = key.split(".");
            if (props[splitKeys[1]]) {
              if (!(props[splitKeys[1]] as { collections?: Record<string, unknown> }).collections) {
                (props[splitKeys[1]] as { collections?: Record<string, unknown> }).collections = {};
              }
              // Wait for the collection promise to resolve with timeout
              try {
                const collectionData = await Promise.race([
                  pagePromises[key],
                  new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Collection fetch timeout')), 10000)
                  )
                ]);
                ((props[splitKeys[1]] as { collections?: Record<string, unknown> }).collections as Record<string, unknown>)[splitKeys[2]] = collectionData as unknown;
              } catch (error) {
                console.error(`Failed to fetch collection ${key}:`, error);
                // Set empty array as fallback
                ((props[splitKeys[1]] as { collections?: Record<string, unknown> }).collections as Record<string, unknown>)[splitKeys[2]] = [];
              }
            }
          }
        }
      }
      
      return resolve(props);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return resolve({
        error: {
          code: 500,
          message: "Error fetching data from Sanity",
        },
      });
    }
  });
}

function getExpand(expand: unknown, prefix?: string) {
  prefix = prefix ? prefix : "";
  let s = `{
    ...,
    `;
  if (Array.isArray(expand)) {
    expand.map((field: { key: string; val: { expand?: unknown; fields?: Array<{ key: string; val: string }> } | Record<string, never>; isMultiple?: boolean }) => {
      const { key, val } = field;
      if (val && typeof val === "object") {
        if (field.isMultiple) {
          if (val && 'expand' in val && val.expand) {
            s += `"${key}": ${key}[]->${getExpand((val as { expand: unknown }).expand, prefix)},`;
          } else if (val && 'fields' in val && val.fields) {
            s += `"${key}": ${key}[]{...,`;
            for (let i = 0; i < (val as { fields: Array<{ key: string; val: string }> }).fields.length; i++) {
              const field = (val as { fields: Array<{ key: string; val: string }> }).fields[i];
              s += `"${field.key}": ${field.val},`;
            }
            s += `}`;
          } else if (Object.keys(val as object).length === 0) {
            // Empty object {} means expand all fields for referenced documents
            s += `"${key}": ${key}[]->{...},`;
          }
        } else {
          if (val && 'expand' in val && val.expand) {
            s += `"${key}": ${key}->${getExpand((val as { expand: unknown }).expand, prefix)},`;
          } else if (Object.keys(val as object).length === 0) {
            // Empty object {} means expand all fields for referenced documents
            s += `"${key}": ${key}->{...},`;
          }
        }
      } else if (typeof val === "string") {
        if (field.isMultiple) {
          s += `      "${key}": ${val}[]->{...},
            `;
        } else {
          s += `      "${key}": ${val}->{...},
            `;
        }
      }
      prefix = "";
    });
  }
  s += `
}`;
  return s;
}

type Filter = { field: string; operator: string; value: unknown };

/**
 * Formats a value for safe use in a GROQ query.
 *
 * @param value - The value to format.
 * @returns The correctly formatted value (string, number, etc.).
 */
function formatValue(value: unknown): string {
  if (typeof value === "string") return `"${value}"`; // Wrap strings in quotes
  return String(value);
}

/**
 * Formats an array of values into a GROQ-compatible array.
 *
 * @param value - The array of values to format.
 * @returns A GROQ array string (e.g., `["new", "sale"]`).
 */
function formatArray(value: unknown[]): string {
  return `[${value.map(formatValue).join(", ")}]`;
}

/**
 * Converts an array of filter objects into a GROQ-compatible filter string.
 *
 * @param filters - An array of { field, operator, value } objects.
 * @returns A string representing the GROQ filter conditions.
 */
function buildFilterString(filters: Filter[]): string {
  return filters
    .map(({ field, operator, value }) => {
      switch (operator) {
        case "==":
        case "=":
          return `${field} == ${formatValue(value)}`;
        case "!=":
          return `${field} != ${formatValue(value)}`;
        case ">":
        case "<":
        case ">=":
        case "<=":
          return `${field} ${operator} ${formatValue(value)}`;
        case "match":
          return `${field} match "${value}"`; // Preserving wildcards
        case "in":
          return `${field} in ${formatArray(value as unknown[])}`;
        case "notIn":
          return `!(${field} in ${formatArray(value as unknown[])})`;
        case "exists":
          return value ? `defined(${field})` : `!defined(${field})`;
        default:
          console.warn(`Unsupported operator: ${operator}`);
          return "";
      }
    })
    .filter(Boolean) // Remove empty strings
    .join(" && ");
}

async function getSectionCollectionData(config: { pageSettings: { sections: Record<string, unknown> }; params?: unknown }): Promise<void> {
  const pageSections = config.pageSettings.sections;
  for (const sectionName in pageSections) {
    const section = pageSections[sectionName] as { collections?: Record<string, { limit?: number; offset?: number; sort?: Record<string, string>; expand?: unknown; filters?: Filter[] }> };
    let expandString = "";
    if (section && section.collections) {
      for (const collectionName in section.collections) {
        const collection = section.collections[collectionName];
        let paginationRangeString = "";
        let sortString = "";
          const defaultLimit = 20;
          if (collection.limit) {
            paginationRangeString = `[${
              collection.offset ? collection.offset : "0"
            }..${collection.limit - 1}]`;
          } else if (collection.offset) {
            paginationRangeString = `[${collection.offset}..${defaultLimit}]`;
          }

          if (collection.sort) {
            sortString += " | order(";
            for (const sort in collection.sort) {
              const [field, direction] = collection.sort[sort].split(":");

              sortString += `${field} ${direction}`;
            }
            sortString += ")";
          }
        expandString = getExpand(collection.expand as unknown);
        let paramsString = "";
        if (collection.filters) {
          paramsString = buildFilterString(collection.filters);
        }
        const queryString = `*[_type == "${camelize(collectionName)}"${paramsString ? ` && ${paramsString}` : ""}]${paginationRangeString}${sortString} ${expandString}`;
        pagePromises[`section.${sectionName + "Content"}.${collectionName}`] = client.fetch(queryString);
      }
    }
  }

  const layoutSectionsUnknown = (layoutSettings as { layout: { sections: unknown } }).layout.sections;
    
    // Handle sections as array (from layout.json structure)
    if (Array.isArray(layoutSectionsUnknown)) {
      const layoutSections = layoutSectionsUnknown as Array<{ name: string; expand?: unknown; collections?: Record<string, unknown> }>;
      for (const section of layoutSections) {
        const pageName = camelize(section.name);
        let sectionExpand = null;
        if (section.expand) {
          sectionExpand = section.expand;
        }
        if (pageName) {
          pagePromises[pageName] = client.fetch(
            `*[_type == "${pageName}"]${getExpand(sectionExpand)}`
          );
        }
        if (section.name && section.collections) {
          for (const collectionName in section.collections) {
            let collectionExpand = null;
            const collection = section.collections[collectionName] as unknown;
            if (collection && typeof collection === 'object' && 'expand' in collection) {
              collectionExpand = (collection as { expand?: unknown }).expand ?? null;
            }

            pagePromises[
              `section.${camelize(section.name) + "Content"}.${collectionName}`
            ] = client.fetch(
              `*[_type == "${camelize(collectionName)}"]${getExpand(
                collectionExpand
              )}`
            );
          }
        }
      }
  } else if (layoutSectionsUnknown && typeof layoutSectionsUnknown === 'object') {
    // Handle sections as object (fallback)
    const layoutSectionsObj = layoutSectionsUnknown as Record<string, { name: string; expand?: unknown; collections?: Record<string, unknown> }>;
    for (const sectionName in layoutSectionsObj) {
      const section = layoutSectionsObj[sectionName];
      const pageName = camelize(section.name);
      let sectionExpand = null;
      if (section.expand) {
        sectionExpand = section.expand;
      }
      if (pageName) {
        pagePromises[pageName] = client.fetch(
          `*[_type == "${pageName}"]${getExpand(sectionExpand)}`
        );
      }
      if (section.name && section.collections) {
        for (const collectionName in section.collections) {
          let collectionExpand = null;
          const collection = section.collections[collectionName] as unknown;
          if (collection && typeof collection === 'object' && 'expand' in collection) {
            collectionExpand = (collection as { expand?: unknown }).expand ?? null;
          }

          pagePromises[
            `section.${camelize(section.name) + "Content"}.${collectionName}`
          ] = client.fetch(
            `*[_type == "${camelize(collectionName)}"]${getExpand(
              collectionExpand
            )}`
          );
        }
      }
    }
  }
}

export async function getPaths(slug: string) {
  const queryString = `*[_type == "${camelize(slug)}"]`;
  const collection = await client.fetch(queryString);
  return { collection: collection };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getPropData(config: GetPropDataConfig) {
  return new Promise(async (resolve) => {
    const propData: PropData = {};
    // layout collections
    if (config.type === "layout") {
      const propName = config.pageName + "Content";
      if (!propData[propName]) {
        propData[propName] = {};
      }
      if (!propData[propName].collections) {
        propData[propName].collections = {};
      }
    }
    // page collections
    if (config.type === "body") {
      const page = (pagesSettings as { pages: Record<string, unknown> }).pages[config.pageName];
      if (!page) {
        console.warn(`Page does not exist: ${config.pageName}`);
        return resolve(propData);
      }
      const sections = (pagesSettings as { pages: Record<string, { sections: Record<string, unknown> }> }).pages[config.pageName].sections;
      
      for (const sectionName in sections) {
        // Use the sectionName directly since sections don't have a 'name' property
        const propName = camelize(sectionName) + "Content";
        if (!propData[propName]) {
          propData[propName] = {};
        }
        if (!propData[propName].collections) {
          propData[propName].collections = {};
        }
      }
    }
    let sections: Record<string, unknown> = {};
    if (config.type === "body") {
      const page = (pagesSettings as { pages: Record<string, { sections?: Record<string, unknown> }> }).pages[config.pageName];
      if (page && page.sections) {
        sections = page.sections;
        getPageAttributeData(sections, config, propData);
      }
    } else if (config.type === "layout") {
      propData[config.pageName] = {};
      propData[config.pageName].data = config.pageData;
    }
    
    return resolve(propData);
  });
}

function getPageAttributeData(sections: Record<string, unknown>, config: GetPropDataConfig, propData: PropData) {
  for (const sectionName in sections) {
    getSectionAttributeData(sectionName, config, propData);
  }
  return propData;
}

function getSectionAttributeData(sectionName: string, config: GetPropDataConfig, propData: PropData) {
  const propName = camelize(sectionName) + "Content";
  
  if (!propData[propName]) {
    propData[propName] = {};
  }
  
  // Always set global data
  propData[propName].global = config.globalData;
  
  const pageData = config.pageData as { sections?: Array<{ _type: string }> } | undefined;
  if (pageData && pageData.sections) {
    for (let j = 0; j < pageData.sections.length; j++) {
      const section = pageData.sections[j];
      
      // Check if this section matches the current section name from configuration
      const expectedSectionType = camelize(sectionName);
      
      if (section._type === expectedSectionType) {
        propData[propName].data = section;
        break; // Found the matching section, no need to continue
      }
    }
  }
  
  return propData;
}

function camelize(str: string) {
  if (!str) {
    return;
  }
  try {
    return str
      .replace(/-/g, " ")
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  } catch {}
}

/**
 * Fetches a single entry from the Sanity database.
 * @param entryType The type of entry to fetch.
 * @param filters The filters to apply for the entry.
 * @param expandFields Fields to expand (e.g., references).
 * @returns The fetched entry or null if not found.
 */
export async function fetchEntry<T>(
  entryType: string,
  filters: Filter[],
  expandFields: string[] = []
): Promise<T | null> {
  try {
    // Build the GROQ query
    const filterString = buildFilterString(filters);

    // Add projections for expandable fields using ._ref
    const expandProjection = expandFields
      .map((field) => `${field}[]{..., asset-> { ... }}`)
      .join(", ");

    const query = `*[_type == "${entryType}" && ${filterString}][0]{
      ...,
      ${expandProjection}
    }`;

    // Fetch the data from Sanity
    const result = await client.fetch(query);
    return result || null;
  } catch (error) {
    console.error("Error fetching entry:", error);
    return null;
  }
}

export async function fetchEntries(
  entryType: string,
  filters: Filter[],
  expandFields: string[] = []
): Promise<unknown> {
  try {
    // Build the GROQ query
    const filterString = buildFilterString(filters);

    // Add projections for expandable fields with asset URL at the root
    const expandProjection = expandFields
      .map(
        (field) => `
          ${field}[]{
            ...,
            "url": asset->url,
            asset-> { ... }
          }`
      )
      .join(", ");

    const query = `*[_type == "${entryType}" && ${filterString}] {
      ...,
      ${expandProjection}
    }`;

    // Fetch the data from Sanity
    const results = await client.fetch(query);
    return results ? { entries: results } : { entries: [] };
  } catch (error) {
    console.error("Error fetching entries:", error);
    return { entries: [] };
  }
}
