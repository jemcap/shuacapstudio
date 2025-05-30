"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WorkReelProps } from "@/types/types";
import Link from "next/link";

import Autoplay from "embla-carousel-autoplay";

const Reel = ({ info }: { info: WorkReelProps[] }) => {
  return (
    <>
      <Carousel
        className="w-[70vw] lg:w-[75vw] align-element"
        plugins={[Autoplay({ delay: 2000 })]}
      >
        <CarouselContent>
          {info.map((content) => {
            const href = `/work/${content.title}`;

            const CardContentInner = (
              <Card>
                <CardContent className="flex items-center justify-center w-full h-[400px] md:h-[500px] lg:h-[600px] p-0">
                  <img
                    src={content.url}
                    alt={content.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </CardContent>
              </Card>
            );
            return (
              <CarouselItem
                key={content._id}
                className="rounded-xl lg:basis-1/2 "
              >
                {content.link ? (
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {CardContentInner}
                  </a>
                ) : (
                  <Link href={href} className="cursor-pointer block">
                    {CardContentInner}
                  </Link>
                )}
                <div className="flex flex-col justify-center mt-4">
                  {content.host && (
                    <span className="text-sm text-gray-500">
                      {content.host}
                    </span>
                  )}
                  {content.client && (
                    <span className="text-sm text-gray-500">
                      {content.client}
                    </span>
                  )}
                  <h1 className="text-xl font-bold">{content.title}</h1>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default Reel;
