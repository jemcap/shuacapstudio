// import React from "react";

// const Work = () => {
//   return (
//     <div className="h-screen bg-black">
//       <div></div>
//     </div>
//   );
// };

// export default Work;

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Work = () => {
  return (
    <div className="h-full py-28">
      <div className="align-element flex justify-center items-center gap-96 flex-col h-full">
        <section className="align-element w-full">
          <div className="flex-start flex space-y-10">
            <h1 className="text-5xl font-semibold mb-10">Films</h1>
          </div>
          <Carousel className="w-full align-element">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className=" basis-1/2">
                  <div className="p-1 space-y-10">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                    <div className="flex flex-col justify-center">
                      <h1>hello</h1>
                      <p>This is an example description</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
        <section className="align-element w-full">
          <div className="flex-start flex space-y-10">
            <h1 className="text-5xl font-semibold mb-10">Websites</h1>
          </div>
          <Carousel className="w-full align-element">
            <CarouselContent>
              {Array.from({ length: 1 }).map((_, index) => (
                <CarouselItem key={index} className=" basis-1/2">
                  <div className="p-1 space-y-10">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                    <div className="flex flex-col justify-center">
                      <h1>hello</h1>
                      <p>This is an example description</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </div>
    </div>
  );
};

export default Work;
