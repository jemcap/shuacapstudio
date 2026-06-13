"use client";

import { useEffect, useState } from "react";
import VideoInfo from "./videoinfo.component";
import { useVideos } from "@/hooks/use-videos";

export default function VideoGallery() {
  const { data: videos = [], isLoading, isError, error } = useVideos();

  // TODO: Add loading and error UI states
  void isLoading;
  void isError;
  void error;

  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    if (videos.length > 0 && !selected) {
      const defaultVideo = videos.find((v) => v.title === "shuacapstudio");
      setSelected(defaultVideo ? defaultVideo.s3Key : videos[0]?.s3Key || "");
    }
  }, [videos, selected]);

  const filteredVideos = videos.filter(
    (video) => video.title !== "shuacapstudio",
  );

  const selectedVideo = videos.find((vid) => vid.s3Key === selected);

  return (
    <>
      <section className="relative w-full h-screen -z-10">
        {selectedVideo && (
          <video
            key={selectedVideo._id}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            controls={false}
            playsInline
            webkit-playsinline="true"
            preload="none"
          >
            <source src={selectedVideo.url} type="video/mp4" />
          </video>
        )}
      </section>
      <VideoInfo
        selectedVideo={
          videos.find((vid) => vid.s3Key === selected) || undefined
        }
        onVideoSelect={(s3Key) => setSelected(s3Key)}
        videos={videos}
      />

      <section className="absolute w-full bottom-0 -translate-y-1/2 z-10 text-white flex flex-col items-end bg-black/5 backdrop-blur-xs px-8 py-4 rounded-sm">
        <small className="pb-4 tracking-widest text-white/40 underline">Featured films</small>
        <ul className="flex flex-col gap-5 text-right">
          {filteredVideos.map((video) => (
            <li
              key={video._id}
              className={`cursor-pointer transition-all duration-300 ease-in-out ${
                selected === video.s3Key
                  ? "text-white text-3xl font-bold"
                  : "text-white/80 text-lg font-normal hover:text-white/100"
              }`}
              onClick={() => setSelected(video.s3Key)}
            >
              {video.title}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
