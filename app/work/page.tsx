import * as React from "react";

import Films from "@/components/work/films/films.component";
import Websites from "@/components/work/websites/websites.component";

const Work = () => {
  return (
    <div className="h-full mb-20 pt-28">
      <div className="flex gap-12 flex-col ">
        <section className="align-element w-full h-full">

            <h1 className="text-2xl font-bold mx-3">FILMS</h1>

          <Films />
        </section>
        {/* <section className="align-element w-full">
          <div className="flex-start flex space-y-10 border-t-2 ">
            <h1 className="text-lg font-semibold mb-10">WEBSITES</h1>
          </div>
          <Websites />
        </section> */}
      </div>
    </div>
  );
};

export default Work;
