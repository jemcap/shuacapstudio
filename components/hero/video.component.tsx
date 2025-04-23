"use client";

import { useEffect } from "react";
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

        const defaultId = response.data.findIndex(
          (v: any) => v.title === "shuacapstudio"
        );

        dispatch(setSelected(defaultId !== -1 ? defaultId : 0));
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          throw new Error(error.message);
        } else {
          console.error(error);
          throw new Error("An unknown error occurred");
        }
      }
    };
    fetchVideo();
  }, [dispatch]);

  return (
    <>
      <section className="relative w-full h-screen -z-10">
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
      <section className="max-lg:px-7 justify-start lg:justify-center lg:items-center absolute bottom-10 w-full z-10 text-white flex flex-col">
        <ul className="flex flex-col font-bold lg:flex-row gap-10 lg:gap-20">
          {videos.length > 0 &&
            videos
              .filter((video) => video.title !== "shuacapstudio")
              .map((video, i) => (
                <div key={video.key}>
                  <li
                    className={`text-5xl lg:text-2xl cursor-pointer hover:text-gray-300 hover:font-extrabold duration-150 transition-all ease-in-out ${
                      selected === i ? "text-orange-500 text-6xl" : ""
                    }`}
                    onClick={() => dispatch(setSelected(i))}
                  >
                    {video.title}
                  </li>
                </div>
              ))}
        </ul>
      </section>
    </>
  );
}
