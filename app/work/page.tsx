import * as React from "react";

import Films from "@/components/work/films/films.component";
import Websites from "@/components/work/websites/websites.component";

const Work = () => {
  return (
    <div className="h-full my-20">
      <section className="align-element text-start justify-start items-start mb-10">
        <h1 className="text-4xl font-semibold">Screens & Scenes</h1>
        <p className="text-gray-500">
          Films, websites, and the craft behind both.
        </p>
      </section>
      <div className="align-element flex justify-center items-center gap-12 flex-col h-full">
        <section className=" w-full">
          <div className="flex-start flex space-y-10 border-t-2 ">
            <h1 className="text-lg font-semibold mb-5 ">FILMS</h1>
          </div>
          <Films />
        </section>
        <section className="align-element w-full">
          <div className="flex-start flex space-y-10 border-t-2 ">
            <h1 className="text-lg font-semibold mb-10">WEBSITES</h1>
          </div>
          <Websites />
        </section>
      </div>
    </div>
  );
};

export default Work;
