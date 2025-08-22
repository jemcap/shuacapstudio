import AboutMe from "@/components/about/about.component";
import VideoInfo from "@/components/hero/videoinfo.component";
import { Suspense } from "react";
import Loading from "./loading";
import { lazy } from "react";

const VideoGallery = lazy(() => import("@/components/hero/video.component"));

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <VideoGallery />
      </Suspense>
      <VideoInfo />
      <main>
        <AboutMe />
      </main>
    </>
  );
}
