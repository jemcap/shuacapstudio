"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../card/eventCard.component";
import { EventProps } from "@/types/types";

const EventComponent = () => {
  const [event, setEvent] = useState<EventProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8 align-element">
      <div>
        {event.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <h1 className="text-2xl font-bold mb-2 text-center">
              We'll be back with more products soon!
            </h1>
            <p className="text-gray-600">Thanks for your patience.</p>
          </div>
        )}
        
        {videoPackages && (
          <div>
            <h1 className="text-2xl font-bold">
              {formattedName}
            </h1>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          {event.map((ev) => (
            <EventCard {...ev} key={ev._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
