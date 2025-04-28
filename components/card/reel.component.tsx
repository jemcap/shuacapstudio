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

const Reel = ({ info }: { info: WorkReelProps[] }) => {
  return (
    <>
      <Carousel className="w-full align-element">
        <CarouselContent>
          {info.map((content) => (
            <CarouselItem key={content._id} className="rounded-xl lg:basis-1/2">
              <Card>
                <CardContent className="flex items-center justify-center w-full h-[500px] p-0">
                  <img
                    src={content.url}
                    alt={content.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </CardContent>
              </Card>
              <div className="flex flex-col justify-center mt-4">
                <h1 className="text-xl font-bold">{content.title}</h1>
                {content.host && (
                  <span className="text-sm text-gray-500">
                    Host: {content.host}
                  </span>
                )}
                {content.client && (
                  <span className="text-sm text-gray-500">
                    Client: {content.client}
                  </span>
                )}
                <p className="text-base">{content.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default Reel;
