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
import Films from "@/components/work/films/films.component";
import Websites from "@/components/work/websites/websites.component";

const Work = () => {
  return (
    <div className="h-full py-28">
      <div className="align-element flex justify-center items-center gap-40 flex-col h-full">
        <section className="align-element w-full">
          <div className="flex-start flex space-y-10">
            <h1 className="text-5xl font-semibold mb-10">Films</h1>
          </div>
          <Films />
        </section>
        <section className="align-element w-full">
          <div className="flex-start flex space-y-10">
            <h1 className="text-5xl font-semibold mb-10">Websites</h1>
          </div>
          <Websites />
        </section>
      </div>
    </div>
  );
};

export default Work;
