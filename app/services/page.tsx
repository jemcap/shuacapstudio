import ServiceCard from "@/components/card/serviceCard.component";
import ServiceComponent from "@/components/services/service.component";
import React from "react";

const ServicesPage = () => {
  return (
    <div className="h-full  bg-black">
      <div className="flex flex-col gap-10 justify-center items-center">
        <div className="mt-10 text-white flex flex-col justify-center items-center text-center">
          <h1 className=" font-bold text-4xl">Videography Services</h1>
          <p>Choose the package that best fits your project needs</p>
          <p>
            Hit Inquire and fill out the form, and I'll get back to you ASAP!
          </p>
        </div>
        <ServiceComponent />
      </div>
    </div>
  );
};

export default ServicesPage;
