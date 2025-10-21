interface SanityConfig {
    dataset: string;
    projectId: string;
    useCdn: boolean;
    apiVersion: string;
  }
  
  const sanityConfig: SanityConfig = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    useCdn: typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
    apiVersion: '2022-03-13',
  };
  
  export const getSanityConfig = (): SanityConfig => {
    return {
      ...sanityConfig,
      projectId: sanityConfig.projectId,
    };
  };
  
  export default sanityConfig;
  