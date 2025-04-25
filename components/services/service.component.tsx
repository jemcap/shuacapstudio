"use client";

import { useState } from "react";

import serviceCardData from "@/data.json";
import ServiceCard from "../card/serviceCard.component";
import { v4 as uuidv4 } from "uuid";
import ServiceToggle from "../toggle/service-switch.component";

const ServiceComponent = () => {
  const [activeService, setActiveService] = useState<string>("videography");
  return (
    <div className="align-element h-full py-20">
      <div className="justify-center items-center flex">
        <ServiceToggle
          service={activeService}
          onActiveChange={setActiveService}
        />
      </div>
      <div className="my-10 text-white flex flex-col justify-center items-center text-center">
        <h1 className=" font-bold text-4xl">
          {activeService && activeService === "videography"
            ? "Videography "
            : "Web "}
          Services
        </h1>
        <p>Choose the package that best fits your project needs</p>
        <p>Hit Inquire and fill out the form, and I'll get back to you ASAP!</p>
      </div>
      {activeService && activeService === "videography" ? (
        <div className="service-cards-grid">
          {serviceCardData.services.videography.map((card) => {
            return (
              <div key={uuidv4()} className="h-full">
                <ServiceCard {...card} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="service-cards-grid">
          {serviceCardData.services.website.map((card) => {
            return (
              <div key={uuidv4()} className="h-full">
                <ServiceCard {...card} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ServiceComponent;
