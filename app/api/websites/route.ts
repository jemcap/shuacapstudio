import { client } from "@/sanity/lib/client"
import { FilmProps, WorkReelProps } from "@/types/types"

const s3BaseUrl = process.env.S3_BASE_URL

export async function GET() {
    const websites = await client.fetch<WorkReelProps[]>(`*[_type == 'website'] {
        _id,
        title,
        description,
        client,
        link,
        s3Key
        }`)


        const assetUrl: FilmProps[] = websites.filter(web => {
            if (!web.s3Key || typeof web.s3Key !== "string") return false;
            return web
        }).map(web => ({
            ...web,
            host: web.host ?? "",
            client: web.client ?? "",
            link: web.link ?? "",
            url: s3BaseUrl + web.s3Key
        }))

        return Response.json(assetUrl)
}