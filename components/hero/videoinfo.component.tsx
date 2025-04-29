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

  const selectedVideo = video.find((v) => v.s3Key === selected);

  const vid = selectedVideo || null;
  if (!vid || vid.title === "shuacapstudio") return null;
  return (
    <>
      <div className="py-20 h-full space-y-20">
        <section>
          <div className="text-black align-element gap-10 lg:gap-20 grid grid-cols-1 lg:grid-cols-2">
            <div>
              <p className="text-gray-400  text-xl">Title</p>
              <h2 className="text-5xl font-bold">{vid.title}</h2>
            </div>
            <div>
              <p className="text-gray-400  text-xl">Location</p>
              <h2 className="text-5xl font-bold">{vid && vid.location}</h2>
            </div>
            <div>
              <p className="text-gray-400  text-xl">Year of Production</p>
              <h2 className="text-5xl font-bold">{vid.year}</h2>
            </div>
            <div>
              <p className="text-gray-400  text-xl">Host</p>
              <h2 className="text-5xl font-bold">{vid.host}</h2>
            </div>
          </div>
        </section>

        <section className="align-element flex flex-col border-t-2 pt-20">
          <p className="text-gray-400  text-xl">Description</p>
          <h2 className="text-3xl font-bold">{vid.description}</h2>
        </section>
      </div>
    </>
  );
};

export default VideoInfo;
