"use client";

import { useState } from "react";

import serviceCardData from "@/data.json";
import ServiceCard from "../card/serviceCard.component";
import { v4 as uuidv4 } from "uuid";
import ServiceToggle from "../toggle/service-switch.component";

import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    },
  },
};

const ServiceComponent = () => {
  return (
    <div className="align-element h-full mb-20">
      <img
        src="https://shuacapstudio-assets.s3.eu-west-2.amazonaws.com/shuacapstudiologo.png"
        alt="Shuacap Studio logo"
        className="w-full h-[300px] lg:h-[500px] object-cover mb-12 "
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
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{
              delay: idx * 0.15,
            }}
          >
            <ServiceCard {...card} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServiceComponent;
