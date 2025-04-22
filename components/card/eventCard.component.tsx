import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const EventCard = ({
  title,
  location,
  tag,
  url,
}: {
  title: string;
  location: string;
  tag: string[];
  url: string;
}) => {
  return (
    <Link href={`/events/${title}`} className="cursor-pointer">
      <Card className="w-full h-full overflow-hidden border-2">
        <div className="relative w-full h-40">
          <img src={url} alt={title} className="object-cover w-full h-full" />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>

        <CardContent className="text-black mb-5">
          {tag &&
            tag.map((t) => (
              <>
                <span
                  key={t}
                  className="bg-gray-200 px-2 py-1 rounded-md text-xs"
                >
                  {t}
                </span>
              </>
            ))}
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
