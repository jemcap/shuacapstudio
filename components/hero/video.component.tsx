"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function VideoGallery() {
  const [videos, setVideos] = useState<{ key: string; url: string }[]>([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get("/api/videos");
        setVideos(response.data);
      } catch (error) {
        console.error(error.message);
        throw new Error(error);
      }
    };
    fetchVideo();
  }, []);

  return (
    <>
      {videos.map((video) => (
        <video key={video.key} autoPlay loop muted className="w-full">
          <source src={video.url} type="video/mp4" />
        </video>
      ))}
    </>
  );
}
