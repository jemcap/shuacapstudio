"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import VideoInfo from "./videoinfo.component";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setVideos, setSelected } from "@/redux/features/video/videoSlice";
import { Skeleton } from "@/components/ui/skeleton";

export default function VideoGallery() {
  const dispatch = useDispatch();
  const videos = useSelector((state: RootState) => state.video.videos);
  const selected = useSelector((state: RootState) => state.video.selected);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchVideo = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/videos");
        console.log(response);
        dispatch(setVideos(response.data));

        const defaultVideo = response.data.find(
          (v: any) => v.title === "shuacapstudio"
        );

        dispatch(
          setSelected(
            defaultVideo ? defaultVideo.s3Key : response.data[0]?.s3Key || null
          )
        );
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          throw new Error(error.message);
        } else {
          console.error(error);
          throw new Error("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideo();
  }, []);

  const selectedVideo = videos.find((vid) => vid.s3Key === selected);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center space-y-3 h-screen">
          <Skeleton className="h-1/2 w-1/2 rounded-xl" />
        </div>
      ) : (
        <>
          <section className="relative w-full h-screen -z-10">
            {selectedVideo && (
              <video
                key={selectedVideo._id}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              >
                <source src={selectedVideo.url} type="video/mp4" />
              </video>
            )}
          </section>
          <section className="max-lg:px-7 justify-start lg:justify-center lg:items-center absolute bottom-10 w-full z-10 text-white flex flex-col">
            <ul className="flex flex-col font-bold lg:flex-row gap-10 lg:gap-20">
              {videos.length > 0 &&
                videos
                  .filter((video) => video.title !== "shuacapstudio")
                  .map((video) => (
                    <div key={video._id}>
                      <li
                        className={`text-5xl lg:text-2xl cursor-pointer hover:text-gray-300 hover:font-extrabold duration-150 transition-all ease-in-out ${
                          selected === video.s3Key
                            ? "text-orange-500 text-6xl"
                            : ""
                        }`}
                        onClick={() => dispatch(setSelected(video.s3Key))}
                      >
                        {video.title}
                      </li>
                    </div>
                  ))}
            </ul>
          </section>
        </>
      )}
    </>
  );
}
