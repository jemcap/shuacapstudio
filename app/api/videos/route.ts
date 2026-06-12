import type { Video } from '@/types/types'

import { client } from "@/sanity/lib/client"

const s3BaseUrl = process.env.S3_BASE_URL

function buildVideoUrl(s3Key: string) {
  if (!s3BaseUrl) {
    return undefined;
  }

  return `${s3BaseUrl.replace(/\/$/, "")}/${s3Key.replace(/^\//, "")}`;
}

export async function GET() {
  const videos = await client.fetch<Video[]>(`*[_type == "video"]{
    _id,
    title,
    description,
    location,
    year,
    host,
    s3Key
  }`)

    const videoUrl: Video[] = videos.filter(v => !!buildVideoUrl(v.s3Key)).map(v => ({
      ...v,
      url: buildVideoUrl(v.s3Key) as string
    }))

  return Response.json(videoUrl)
}
