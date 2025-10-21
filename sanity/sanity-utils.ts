import { client } from "./client";

/**
 * Builds a filter string for GROQ queries, handling special cases like references.
 * @param filters The filters to apply.
 * @returns The GROQ filter string.
 */
function buildFilterString(filters: Record<string, any>[]): string {
  return filters
    .map((filter) => {
      return Object.entries(filter)
        .map(([key, value]) => {
          if (key === "category") return `${key}._ref == "${value}"`;
          return `${key} == "${value}"`;
        })
        .join(" && ");
    })
    .join(" && ");
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
  filters: Record<string, any>[],
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

export async function fetchEntries<T>(
  entryType: string,
  filters: Record<string, any>[],
  expandFields: string[] = []
): Promise<{ entries: T[] }> {
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
    return { entries: results || [] };
  } catch (error) {
    console.error("Error fetching entries:", error);
    return { entries: [] };
  }
}

