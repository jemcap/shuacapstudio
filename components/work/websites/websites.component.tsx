import { WorkReelProps } from "@/types/types";
import Reel from "@/components/card/reel.component";

const Websites = ({ websites }: { websites: WorkReelProps[] }) => {
  return (
    <div>
      <Reel info={websites} />
    </div>
  );
};

export default Websites;
