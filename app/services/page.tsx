import ServiceCard from "@/components/card/serviceCard.component";
import ServiceComponent from "@/components/services/service.component";
import React from "react";

const ServicesPage = () => {
  return (
    <div className="h-full">
      <div className="flex flex-col gap-10 justify-center items-center pt-28">
        <ServiceComponent />
      </div>
    </div>
  );
};

export default ServicesPage;
