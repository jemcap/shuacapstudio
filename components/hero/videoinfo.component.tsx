import React from "react";

interface VideoProps {
  key: string;
  url: string;
  title: string;
}

const VideoInfo = ({ video }: { video: VideoProps | null }) => {
  if (!video) return null;
  return (
    <div>
      <h2>{video.title}</h2>
    </div>
  );
};

export default VideoInfo;
