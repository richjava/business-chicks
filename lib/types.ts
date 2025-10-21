// TypeScript interfaces for Business Chicks theme project
// Generated based on schemas/sections.json and schemas/content-types.json

// Base content type interface
export interface BaseContentType {
  _id: string;
  _type: string;
  slug: string;
}

// Portable text types for rich content
export interface PortableTextSpan {
  _key: string;
  _type: "span";
  text: string;
  marks: string[];
}

export interface PortableTextBlock {
  _key: string;
  _type: "block";
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  level?: number;
  listItem?: "bullet" | "number";
  children: PortableTextSpan[];
  markDefs: unknown[];
}

export type PortableText = PortableTextBlock[];

// Content type interfaces (from schemas/content-types.json)
export interface NavigationItem extends BaseContentType {
  _type: "navigationItem";
  label: string;
  url: string;
}

export interface Testimonial extends BaseContentType {
  _type: "testimonial";
  quote?: string;
  name: string;
  role: string;
  email: string;
  image?: {
    url: string;
  };
}

export interface KeywordSlide extends BaseContentType {
  _type: "keywordSlide";
  keyword?: string;
  phrase?: string;
  image?: {
    url: string;
  };
}

export interface Resource extends BaseContentType {
  _type: "resource";
  title?: string;
  description?: string;
  url: string;
}

// Section data interfaces (from schemas/sections.json)
export type HeaderSectionData = Record<string, never>;

export type FooterSectionData = Record<string, never>;

export interface HomeLandingSectionData {
  heading?: string;
}

export interface MainCTASectionData {
  title?: string;
  blurb?: string;
}

export interface MeetingsCTASectionData {
  title?: string;
  text?: PortableText;
}

export interface JoinCTASectionData {
  title: string;
  ctaText: string;
  questions?: string[];
  text1?: PortableText;
  text2?: PortableText;
}

export type HomeTestimonialsSectionData = Record<string, never>;

export interface JoinBannerSectionData {
  title: string;
}

export interface MembershipSectionData {
  title?: string;
  blurb?: string;
  text?: PortableText;
}

export interface RequirementsSectionData {
  requirements: string;
  text?: PortableText;
}

export type JoinTestimonialsSectionData = Record<string, never>;

export interface MeetingsBannerSectionData {
  title: string;
}

export interface MeetingsInfoSectionData {
  title?: string;
  blurb?: string;
  text?: PortableText;
  locationLat: string;
  locationLng: string;
}

export interface MeetingsJoinCTASectionData {
  title: string;
  text?: string;
}

export type MeetingsTestimonialsSectionData = Record<string, never>;

export interface ResourcesBannerSectionData {
  title: string;
}

export type ResourcesSectionData = Record<string, never>;

export type ResourcesTestimonialsSectionData = Record<string, never>;

export interface ContactBannerSectionData {
  title: string;
}

export interface ContactSectionData {
  title: string;
  blurb?: string;
}

// Collections interface
export interface SectionCollections {
  navigationItem?: NavigationItem[];
  testimonial?: Testimonial[];
  keywordSlide?: KeywordSlide[];
  resource?: Resource[];
}

// Main section interface
export interface Section {
  name: string;
  title: string;
  type: "layout" | "body";
  templates: string[];
  defaultTemplate: {
    name: string;
  };
  data?: unknown; // Will be typed based on section name
  collections?: SectionCollections;
}

// Global data interface
export interface GlobalData {
  name: string;
  logo?: {
    url: string;
  };
}

// Theme data interface
export interface ThemeData {
  title: string;
  namespace: string;
  description: string;
  router: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    neutral: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
  };
  fonts: {
    primary: string;
    secondary: string;
    display: string;
  };
  corners: {
    small: string;
    medium: string;
    large: string;
    xl: string;
    "2xl": string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Component props interfaces - CRITICAL: All components in components/templates/ MUST only accept a 'content' prop
export interface HeaderProps {
  content?: {
    data?: HeaderSectionData;
    collections?: SectionCollections;
  };
}

export interface FooterProps {
  content?: {
    data?: FooterSectionData;
    collections?: SectionCollections;
  };
}

export interface HomeLandingProps {
  content?: {
    data?: HomeLandingSectionData;
    collections?: SectionCollections;
  };
}

export interface MainCTAProps {
  content?: {
    data?: MainCTASectionData;
    collections?: SectionCollections;
  };
}

export interface MeetingsCTAProps {
  content?: {
    data?: MeetingsCTASectionData;
    collections?: SectionCollections;
  };
}

export interface JoinCTAProps {
  content?: {
    data?: JoinCTASectionData;
    collections?: SectionCollections;
  };
}

export interface TestimonialsSliderProps {
  content?: {
    data?: unknown;
    collections?: SectionCollections;
  };
}

export interface BannerProps {
  content?: {
    data?: {
      title: string;
    };
    collections?: SectionCollections;
  };
}

export interface MembershipProps {
  content?: {
    data?: MembershipSectionData;
    collections?: SectionCollections;
  };
}

export interface RequirementsProps {
  content?: {
    data?: RequirementsSectionData;
    collections?: SectionCollections;
  };
}

export interface InfoProps {
  content?: {
    data?: MeetingsInfoSectionData;
    collections?: SectionCollections;
  };
}

export interface ResourcesAccordionProps {
  content?: {
    data?: unknown;
    collections?: SectionCollections;
  };
}

export interface ContactFormProps {
  content?: {
    data?: ContactSectionData;
    collections?: SectionCollections;
  };
}

// Utility types
export type SectionName = 
  | "header"
  | "footer"
  | "homeLanding"
  | "mainCTA"
  | "meetingsCTA"
  | "joinCTA"
  | "homeTestimonials"
  | "joinBanner"
  | "membership"
  | "requirements"
  | "joinTestimonials"
  | "meetingsBanner"
  | "meetingsInfo"
  | "meetingsJoinCTA"
  | "meetingsTestimonials"
  | "resourcesBanner"
  | "resources"
  | "resourcesTestimonials"
  | "contactBanner"
  | "contact";

export type ContentType = 
  | "navigationItem"
  | "testimonial"
  | "keywordSlide"
  | "resource";

// Error handling types
export interface ComponentError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface LoadingState {
  isLoading: boolean;
  error?: ComponentError;
}
