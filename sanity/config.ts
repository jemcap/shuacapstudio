// Backup configuration with hardcoded values if env vars fail
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ghx3biph',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-04-22',
  useCdn: process.env.NODE_ENV === 'production',
};

// Validate configuration
if (!sanityConfig.projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
}

if (!sanityConfig.dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable');
}
