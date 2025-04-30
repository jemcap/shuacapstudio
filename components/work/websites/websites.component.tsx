"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { WorkReelProps } from "@/types/types";
import Reel from "@/components/card/reel.component";
import Link from "next/link";

const Websites = () => {
  const [websites, setWebsites] = useState<WorkReelProps[]>([]);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await axios.get("/api/websites");
        setWebsites(response.data);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };
    fetchWebsites();
  }, []);
  return (
    <div>
      <Reel info={websites} />
    </div>
  );
};

export default Websites;
