import Chatbot from "@/components/chatbot.component";
import ServiceComponent from "@/components/services/service.component";
import React from "react";

const ServicesPage = () => {
  return (
    <div className="w-full">
      <ServiceComponent />
      <Chatbot />
    </div>
  );
};

export default ServicesPage;
