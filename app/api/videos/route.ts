import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import videoMeta from '@/data/videos.json'


const client = new S3Client({
  region: "eu-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  const command = new ListObjectsV2Command({
    Bucket: "shuacapstudio-assets",
    Prefix: "",
  });

  const data = await client.send(command);

  const videos = data.Contents?.filter(item => item.Key?.endsWith('mp4')).map((item) => {
    const vidMetaData = videoMeta.find(v => v.key === item.Key)
    return {
      key: item.Key,
      url: `https://shuacapstudio-assets.s3.eu-west-2.amazonaws.com/${item.Key}`,
      title: vidMetaData && vidMetaData.title || "Movie",
      location: videoMeta && vidMetaData?.location || "Somewhere",
      year: videoMeta && vidMetaData?.year || null,
      host: vidMetaData && vidMetaData?.host || null
    }
  })
  return Response.json(videos)
}
