"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import VideoInfo from "./videoinfo.component";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setVideos, setSelected } from "@/redux/features/video/videoSlice";

export default function VideoGallery() {
  const dispatch = useDispatch();
  const videos = useSelector((state: RootState) => state.video.videos);
  const selected = useSelector((state: RootState) => state.video.selected);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get("/api/videos");
        dispatch(setVideos(response.data));
      } catch (error) {
        console.error(error.message);
        throw new Error(error);
      }
    };
    fetchVideo();
  }, []);

  return (
    <>
      <div className="align-element">
        <section className="absolute inset-0 w-screen h-screen -z-10">
          {videos[selected] && (
            <video
              key={videos[selected].key}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            >
              <source src={videos[selected].url} type="video/mp4" />
            </video>
          )}
        </section>
        <section className="absolute bottom-5 w-fit z-10 text-white flex flex-col">
          <ul className="list-disc flex flex-col font-bold lg:flex-row gap-20 text-2xl">
            {videos.length > 0 &&
              videos
                .filter((video) => video.title !== "shuacapstudio")
                .map((video, i) => (
                  <li
                    key={video.key}
                    className={`cursor-pointer hover:text-gray-300 hover:font-extrabold duration-150 transition-all ease-in-out ${
                      selected === i ? "text-orange-500 text-3xl" : ""
                    }`}
                    onClick={() => dispatch(setSelected(i))}
                  >
                    {video.title}
                  </li>
                ))}
          </ul>
        </section>
      </div>
    </>
  );
}
