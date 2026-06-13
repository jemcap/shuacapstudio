"use client";

import { motion } from "framer-motion";

const ServiceComponent = () => {
  return (
    <div className="w-full">
      {/* Statement */}
      <section className="w-full px-8 py-20 border-b border-gray-200">
        <motion.p
          className="text-2xl sm:text-3xl font-light text-gray-900 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Great brands don&apos;t just tell their story — they show it. That&apos;s where I come in.
        </motion.p>
      </section>

      {/* Services list */}
      <section className="w-full px-8 py-16">
        <motion.p
          className="uppercase tracking-[0.25em] text-xs text-gray-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What I offer
        </motion.p>

        {/* 01 — Videography */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16 border-t border-gray-200 py-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-start gap-5 lg:w-1/2">
            <span className="text-6xl font-thin text-gray-200 leading-none select-none">
              01
            </span>
            <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900 pt-3">
              Videography
            </h3>
          </div>
          <p className="text-base text-gray-600 leading-relaxed lg:w-1/2">
            Cinematic video production from concept to final edit — promotional
            videos, event coverage, and brand storytelling. Visual narratives that
            capture your vision and hold an audience.
          </p>
        </motion.div>

        {/* 02 — Content Creation */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16 border-t border-b border-gray-200 py-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-start gap-5 lg:w-1/2">
            <span className="text-6xl font-thin text-gray-200 leading-none select-none">
              02
            </span>
            <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900 pt-3">
              Content Creation
            </h3>
          </div>
          <p className="text-base text-gray-600 leading-relaxed lg:w-1/2">
            Strategic content development for social media, marketing campaigns, and
            digital platforms. From concept to execution — content that tells your
            story and moves people to act.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default ServiceComponent;
