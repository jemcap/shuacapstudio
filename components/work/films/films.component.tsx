import { WorkReelProps } from "@/types/types";
import Reel from "@/components/card/reel.component";

const Films = ({ films }: { films: WorkReelProps[] }) => {
  return (
    <div>
      <Reel info={films} />
    </div>
  );
};

export default Films;
