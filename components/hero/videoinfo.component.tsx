"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// interface VideoProps {
//   key: string;
//   url: string;
//   title: string;
//   location?: string;
// }

const VideoInfo = () => {
  const video = useSelector((state: RootState) => state.video.videos);
  const selected = useSelector((state: RootState) => state.video.selected);

  const selectedVid = video[selected] || null;
  console.log(selectedVid);
  if (!selectedVid || selectedVid.title === "shuacapstudio") return null;
  return (
    <>
      <div className="py-20 h-full space-y-20">
        <section>
          <div className="text-black align-element gap-10 lg:gap-20 grid grid-cols-1 lg:grid-cols-2">
            <div>
              <p className="text-gray-400  text-xl">Title</p>
              <h2 className="text-5xl font-bold">{selectedVid.title}</h2>
            </div>
            <div>
              <p className="text-gray-400  text-xl">Location</p>
              <h2 className="text-5xl font-bold">
                {selectedVid && selectedVid.location}
              </h2>
            </div>
            <div>
              <p className="text-gray-400  text-xl">Year of Production</p>
              <h2 className="text-5xl font-bold">{selectedVid.year}</h2>
            </div>
            <div>
              <p className="text-gray-400  text-xl">Host</p>
              <h2 className="text-5xl font-bold">{selectedVid.host}</h2>
            </div>
          </div>
        </section>

        <section className="flex justify-center items-center flex-col">
          <p className="text-gray-400  text-xl">Description</p>
          <h2 className="text-3xl font-bold">{selectedVid.description}</h2>
        </section>
      </div>
    </>
  );
};

export default VideoInfo;
