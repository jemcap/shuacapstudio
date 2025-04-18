"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface VideoProps {
  key: string;
  url: string;
  title: string;
}

const VideoInfo: React.FC<VideoProps> = () => {
  const video = useSelector((state: RootState) => state.video.videos);
  const selected = useSelector((state: RootState) => state.video.selected);

  const selectedVid = video[selected] || null;
  console.log(selectedVid);
  if (!selectedVid || selectedVid.title === "shuacapstudio") return null;
  return (
    <div className="text-black h-screen align-element py-20">
      <h2 className="text-5xl font-bold">{selectedVid.title}</h2>
    </div>
  );
};

export default VideoInfo;
