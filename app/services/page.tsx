import Chatbot from "@/components/chatbot.component";
import ServiceComponent from "@/components/services/service.component";
import React from "react";

const ServicesPage = () => {
  return (
    <div className="w-full">
      <section className="w-full px-8 pt-36">
        <h1 className="text-black text-7xl tracking-tight leading-none">
          Services
        </h1>
      </section>
      <ServiceComponent />
      <Chatbot />
    </div>
  );
};

export default ServicesPage;
