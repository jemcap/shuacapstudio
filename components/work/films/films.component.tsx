"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { FilmProps, WorkReelProps } from "@/types/types";
import Reel from "@/components/card/reel.component";

const Films = () => {
  const [films, setFilms] = useState<WorkReelProps[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get("/api/films");
        setFilms(response.data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    fetchFilms();
  }, []);
  return (
    <div>
      <Reel info={films} />
    </div>
  );
};

export default Films;
