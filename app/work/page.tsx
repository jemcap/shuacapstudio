import Reel from "@/components/card/reel.component";
import { getWorkListings } from "@/lib/work";

export const revalidate = 60;

const Work = async () => {
  const films = await getWorkListings("film");

  return (
    <div className="w-full">
      <section className="w-full px-8 pt-36">
        <h1 className="text-black text-7xl sm:text-8xl lg:text-7xl  tracking-tight leading-none">
          Films
        </h1>
      </section>

      <section className="w-full px-8">
        <Reel info={films} />
      </section>
    </div>
  );
};

export default Work;
