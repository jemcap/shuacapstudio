/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  // Allow studio in production if explicitly enabled
  const studioEnabled = process.env.NEXT_PUBLIC_SANITY_STUDIO_ENABLED === 'true' || process.env.NODE_ENV !== "production";
  
  if (!studioEnabled) {
    return null;
  }
  
  return <NextStudio config={config} />;
}
