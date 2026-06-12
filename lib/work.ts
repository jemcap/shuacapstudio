import { client } from "@/sanity/lib/client";
import type { WorkReelProps, WorkType } from "@/types/types";

type SanityWork = Omit<WorkReelProps, "videoUrl" | "url"> & {
  s3Key?: string;
};

const workFields = `{
  _id,
  "type": _type,
  title,
  "slug": slug.current,
  description,
  host,
  client,
  location,
  year,
  link,
  s3Key,
  "thumbnail": select(
    defined(thumbnail.asset) => {
      "url": thumbnail.asset->url,
      "alt": thumbnail.alt
    },
    null
  )
}`;

function buildVideoUrl(s3Key?: string) {
  const baseUrl = process.env.S3_BASE_URL;

  if (!baseUrl || !s3Key) {
    return undefined;
  }

  return `${baseUrl.replace(/\/$/, "")}/${s3Key.replace(/^\//, "")}`;
}

function normalizeWorkItem(work: SanityWork): WorkReelProps {
  return {
    ...work,
    videoUrl: buildVideoUrl(work.s3Key),
    url: work.thumbnail?.url,
  };
}

export async function getWorkListings(type: WorkType) {
  const works = await client.fetch<SanityWork[]>(
    `*[_type == $type && defined(slug.current)] | order(_createdAt desc) ${workFields}`,
    { type },
  );

  return works.map(normalizeWorkItem);
}

export async function getWorkBySlug(slug: string) {
  const work = await client.fetch<SanityWork | null>(
    `*[_type in ["film", "video", "website"] && slug.current == $slug][0] ${workFields}`,
    { slug },
  );

  return work ? normalizeWorkItem(work) : null;
}
