import React from "react";

import serviceCardData from "@/data.json";
import ServiceCard from "../card/serviceCard.component";
import { v4 as uuidv4 } from "uuid";

const ServiceComponent = () => {
  return (
    <div className="align-element h-full">
      <div className=" justify-center items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {serviceCardData.services.map((card) => {
          return (
            <div key={uuidv4()} className="h-full">
              <ServiceCard {...card} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceComponent;
