export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-04-22'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ghx3biph';

// Debug logging for development only
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Sanity Config:', {
    projectId,
    dataset,
    apiVersion,
    hasProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    hasDataset: !!process.env.NEXT_PUBLIC_SANITY_DATASET
  });
}
