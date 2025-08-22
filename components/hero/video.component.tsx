"use client";

import { useEffect, useState, useRef, TouchEvent } from "react";
import axios from "axios";
import VideoInfo from "./videoinfo.component";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setVideos, setSelected } from "@/redux/features/video/videoSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Video } from "@/types/types";

export default function VideoGallery() {
  const dispatch = useDispatch();
  const videos = useSelector((state: RootState) => state.video.videos);
  const selected = useSelector((state: RootState) => state.video.selected);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get<Video[]>("/api/videos");
        const filteredVideos = response.data.filter(
          (v: Video) => v.title !== "shuacapstudio"
        );
        dispatch(setVideos(response.data));

        const defaultVideo = response.data.find(
          (v: Video) => v.title === "shuacapstudio"
        );

        dispatch(
          setSelected(
            defaultVideo ? defaultVideo.s3Key : response.data[0]?.s3Key || ""
          )
        );

        if (defaultVideo) {
          const index = filteredVideos.findIndex(
            (v: Video) => v.s3Key === defaultVideo.s3Key
          );
          if (index !== -1) setCurrentIndex(index);
        }
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
  }, []);

  const filteredVideos = videos.filter(
    (video) => video.title !== "shuacapstudio"
  );

  const selectedVideo = videos.find((vid) => vid.s3Key === selected);

  // Handle carousel navigation
  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      dispatch(setSelected(filteredVideos[newIndex].s3Key));
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredVideos.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      dispatch(setSelected(filteredVideos[newIndex].s3Key));
    }
  };

  // Handle touch events for swiping
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    }

    if (touchEnd - touchStart > 50) {
      handlePrev();
    }
  };

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
          >
            <source src={selectedVideo.url} type="video/mp4" />
          </video>
        )}
      </section>

          {isMobile ? (
            <section
              className="absolute bottom-20 w-full z-10 text-white"
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative px-4">
                <div className="flex justify-center items-center">
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 opacity-70 hover:opacity-100"
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft
                      size={32}
                      className={
                        currentIndex === 0 ? "text-gray-500" : "text-white"
                      }
                    />
                  </button>

                  <div className="text-center">
                    {filteredVideos.length > 0 &&
                      filteredVideos[currentIndex] && (
                        <h2 className="text-4xl font-bold animate-fadeIn">
                          {filteredVideos[currentIndex].title}
                        </h2>
                      )}
                  </div>

                  <button
                    onClick={handleNext}
                    className="absolute right-2 opacity-70 hover:opacity-100"
                    disabled={currentIndex === filteredVideos.length - 1}
                  >
                    <ChevronRight
                      size={32}
                      className={
                        currentIndex === filteredVideos.length - 1
                          ? "text-gray-500"
                          : "text-white"
                      }
                    />
                  </button>
                </div>

                <div className="flex justify-center mt-4">
                  {filteredVideos.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 w-2 rounded-full mx-1 ${
                        idx === currentIndex ? "bg-orange-500" : "bg-gray-400"
                      }`}
                      onClick={() => {
                        setCurrentIndex(idx);
                        dispatch(setSelected(filteredVideos[idx].s3Key));
                      }}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section className="max-lg:px-7 justify-start lg:justify-center lg:items-center absolute bottom-10 w-full z-10 text-white flex flex-col">
              <ul className="flex flex-col font-bold lg:flex-row gap-10 lg:gap-20">
                {videos.length > 0 &&
                  videos
                    .filter((video) => video.title !== "shuacapstudio")
                    .map((video) => (
                      <div key={video._id}>
                        <li
                          className={`text-3xl lg:text-lg cursor-pointer hover:text-gray-300 hover:font-extrabold duration-150 transition-all ease-in-out ${
                            selected === video.s3Key
                              ? "text-orange-500 text-6xl underline"
                              : ""
                          }`}
                          onClick={() => {
                            dispatch(setSelected(video.s3Key));
                            const index = filteredVideos.findIndex(
                              (v) => v.s3Key === video.s3Key
                            );
                            if (index !== -1) setCurrentIndex(index);
                          }}
                        >
                          {video.title}
                        </li>
                      </div>
                    ))}
              </ul>
            </section>
          )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
