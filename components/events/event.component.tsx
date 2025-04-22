"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../card/eventCard.component";

type EventProps = {
  _id: string;
  title: string;
  location: string;
  tag: string[];
  url: string;
};

const EventComponent = () => {
  const [event, setEvent] = useState<EventProps[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        console.log(response.data);
        setEvent(response.data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    fetchEvents();
  }, []);
  return (
    <div className="my-20">
      {event.map((ev) => (
        <div key={ev._id} className="grid grid-cols-3">
          <EventCard {...ev} />
        </div>
      ))}
    </div>
  );
};

export default EventComponent;
