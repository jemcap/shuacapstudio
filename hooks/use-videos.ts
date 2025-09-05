"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Video } from "@/types/types";

async function fetchVideos(): Promise<Video[]> {
  const { data } = await axios.get<Video[]>("/api/videos");
  return data;
}

export function useVideos() {
  return useQuery<Video[], Error>({
    queryKey: ["videos"],
    queryFn: fetchVideos,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: true,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}
