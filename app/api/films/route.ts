import { client } from "@/sanity/lib/client"
import { FilmProps } from "@/types/types"

const s3BaseUrl = process.env.S3_BASE_URL

export async function GET() {
    const films = await client.fetch<FilmProps[]>(`*[_type == 'film'] {
        _id,
        title,
        description,
        host,
        s3Key
        }`)

        const allowedExtensions = ['.jpg', '.png', '.tif']

        const assetUrl: FilmProps[] = films.filter(film => {
            if (!film.s3Key || typeof film.s3Key !== "string") return false;
            return allowedExtensions.some(ext => film.s3Key.toLowerCase().endsWith(ext))
        }).map(film => ({
            ...film,
            url: s3BaseUrl + film.s3Key
        }))

        return Response.json(assetUrl)
}