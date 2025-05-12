import * as React from "react";

import Films from "@/components/work/films/films.component";
import Websites from "@/components/work/websites/websites.component";

const Work = () => {
  return (
    <div className="h-full mb-20 pt-28">
      <div className="align-element flex  gap-12 flex-col ">
        <section className=" w-full h-full">
          <div className="flex-start flex space-y-10 border-t-2 ">
            <h1 className="text-lg font-semibold mb-5 ">FILMS</h1>
          </div>
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
