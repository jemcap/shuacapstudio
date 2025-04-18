import VideoGallery from "@/components/hero/video.component";
import VideoInfo from "@/components/hero/videoinfo.component";

export default function Home() {
  return (
    <>
      <VideoGallery />
      <div>
        <VideoInfo />
      </div>
    </>
  );
}
