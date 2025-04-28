import { client } from "@/sanity/lib/client"
import { Event } from "@/types/types"

const s3BaseUrl = process.env.S3_BASE_URL

export async function GET() {
    const events = await client.fetch<Event[]>(`*[_type == 'event'] {
        _id,
        title,
        location,
        tag,
        s3Key,
        packages
        }`)

        const allowedExtensions = ['.jpg', '.png', '.tif']

        // const assetUrl: Event[] = events.filter(v => !!v.s3Key).map(v => ({
        //     ...v,
        //     url: s3BaseUrl + v.s3Key
        // }))

        const assetUrl: Event[] = events.filter(v => {
            if (!v.s3Key || typeof v.s3Key !== "string") return null;
            return allowedExtensions.some(ext => v.s3Key.toLowerCase().endsWith(ext))
        }).map(v => ({
            ...v,
            url: s3BaseUrl + v.s3Key
        }))

        return Response.json(assetUrl)
}