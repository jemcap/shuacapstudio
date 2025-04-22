

import type { Video } from '@/types/types'

import { client } from "@/sanity/lib/client"



  const s3BaseUrl = process.env.S3_BASE_URL

// const s3Client = new S3Client({
//   region: "eu-west-2",
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

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

    const videoUrl: Video[] = videos.filter(v => !!v.s3Key).map(v => ({
      ...v,
      url: s3BaseUrl + v.s3Key
    }))
  // const command = new ListObjectsV2Command({
  //   Bucket: "shuacapstudio-assets",
  //   Prefix: "",
  // });

  // const data = await s3Client.send(command);

  // const videos = data.Contents?.filter(item => item.Key?.endsWith('mp4')).map((item) => {
  //   const vidMetaData = videoMeta.find(v => v.key === item.Key)
  //   return {
  //     key: item.Key,
  //     url: `https://shuacapstudio-assets.s3.eu-west-2.amazonaws.com/${item.Key}`,
  //     title: vidMetaData && vidMetaData.title || "Movie",
  //     location: videoMeta && vidMetaData?.location || "Somewhere",
  //     year: videoMeta && vidMetaData?.year || null,
  //     host: vidMetaData && vidMetaData?.host || null
  //   }
  // })
  console.log(videoUrl)
  return Response.json(videoUrl)
}
