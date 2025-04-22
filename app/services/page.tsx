import ServiceCard from "@/components/card/service.component";
import ServiceToggle from "@/components/toggle/service-switch.component";
import React from "react";

const ServicesPage = () => {
  return (
    <div className="h-screen bg-black">
      <section className="align-element text-white border-2 border-red-500 h-screen">
        <ServiceToggle />
        <div>
          <ServiceCard />
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
