"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../card/eventCard.component";
import { EventProps } from "@/types/types";

const EventComponent = () => {
  const [event, setEvent] = useState<EventProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(event);
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/events");

        setEvent(response.data);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const videoPackages = event
    .flatMap((ev) => ev.packages)
    .find((pkg) => pkg.name.includes("Video"));

  const formattedName = videoPackages
    ? videoPackages.name.toUpperCase().split(" ").slice(1).join(" ").trim() +
      "S"
    : "";

  if (isLoading) {
    // Skeleton grid matching your layout
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-10">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 rounded-xl h-80 w-full"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      {event.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10">
          <h1 className="text-2xl font-bold mb-2 text-center">
            We'll be back with more products soon!
          </h1>
          <p className="text-gray-600">Thanks for your patience.</p>
        </div>
      )}
      {event.map((ev) => (
        <div className="border-t-2" key={ev._id}>
          {videoPackages && (
            <h1 className="text-lg font-semibold">{formattedName}</h1>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <EventCard {...ev} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventComponent;
