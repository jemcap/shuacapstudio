"use client";

import React from "react";
import { Video } from "@/types/types";

interface VideoInfoProps {
  selectedVideo?: Video;
  onVideoSelect?: (s3Key: string) => void;
  videos?: Video[];
}

const VideoInfo = ({
  selectedVideo,
  onVideoSelect, // Future use - video selection callback
  videos, // Future use - all available videos
}: VideoInfoProps) => {
  // Explicitly acknowledge unused params to avoid TypeScript warnings
  void onVideoSelect;
  void videos;
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
