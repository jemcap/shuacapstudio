import AboutMe from "@/components/about/about.component";
import VideoGallery from "@/components/hero/video.component";
import VideoInfo from "@/components/hero/videoinfo.component";

export default function Home() {
  return (
    <>
      <VideoGallery />
      <VideoInfo />

      <main>
        <AboutMe />
      </main>
    </>
  );
}
