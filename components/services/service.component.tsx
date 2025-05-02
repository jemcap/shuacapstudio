"use client";

import { useState } from "react";

import serviceCardData from "@/data.json";
import ServiceCard from "../card/serviceCard.component";
import { v4 as uuidv4 } from "uuid";
import ServiceToggle from "../toggle/service-switch.component";

const ServiceComponent = () => {
  const [activeService, setActiveService] = useState<string>("videography");
  return (
    <div className="align-element h-full my-20">
      <div className="flex flex-col lg:flex-row-reverse lg:justify-between lg:items-center">
        <div>
          <ServiceToggle
            service={activeService}
            onActiveChange={setActiveService}
          />
        </div>
        <div className="mb-10 text-accent-foreground flex flex-col justify-center items-center text-center lg:text-start lg:justify-start lg:items-start">
          <h1 className=" font-semibold text-4xl ">
            {activeService && activeService === "videography"
              ? "Videography "
              : "Web "}
            Services
          </h1>
          <p className="text-gray-500">
            Choose the package that best fits your project needs
          </p>
        </div>
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
