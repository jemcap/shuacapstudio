import { client } from "@/sanity/lib/client";
import { Event } from "@/types/types";

export async function GET() {
  const events = await client.fetch<Event[]>(`*[_type == 'event'] {
        _id,
        title,
        location,
        tag,
        coverImage {
            asset-> {
                _id,
                url
            },
            alt,
            caption
        },
        packages
        }`);

  return Response.json(events);
}
