import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

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
  const videos = data.Contents?.map((item) => ({
    key: item.Key,
    url: `https://shuacapstudio-assets.s3.eu-west-2.amazonaws.com/shuacap_studio_productions.mp4`
  }));
  return Response.json(videos)
}
