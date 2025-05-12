"use client";

import { useState } from "react";

import serviceCardData from "@/data.json";
import ServiceCard from "../card/serviceCard.component";
import { v4 as uuidv4 } from "uuid";
import ServiceToggle from "../toggle/service-switch.component";

import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ServiceComponent = () => {
  return (
    <div className="align-element h-full mb-20">
      <img
        src="https://shuacapstudio-assets.s3.eu-west-2.amazonaws.com/shuacapstudiologo.png"
        alt="Shuacap Studio logo"
        className="w-full h-[500px] object-cover mb-12 "
      />
      <div className="flex flex-col  gap-10">
        <div className="flex-start flex space-y-10 border-t-2 ">
          <h1 className="text-lg font-semibold mb-5 uppercase">
            Videography services
          </h1>
        </div>
      </div>

      <div className="service-cards-grid">
        {serviceCardData.services.videography.map((card, idx) => (
          <motion.div
            key={uuidv4()}
            className="h-full"
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <ServiceCard {...card} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServiceComponent;
