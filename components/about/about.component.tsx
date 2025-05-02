import React from "react";
import Image from "next/image";

const AboutMe = () => {
  return (
    <section className="align-element my-20">
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
        <div className="lg:border-r-2 lg:pr-10 max-w-xl text-left">
          <h1 className="text-4xl font-bold mb-4">Shuacap Studio</h1>
          <p className="text-lg leading-relaxed text-gray-700">
            Welcome to Shuacap Studio — a creative hub where technology meets
            storytelling. I'm a multidisciplinary developer and media artist
            with a passion for crafting immersive digital experiences. From
            building dynamic websites and web apps to directing engaging video
            content, my work blends design, development, and visual storytelling
            into cohesive and impactful experiences. I specialise in capturing
            emotion and narrative through compelling visuals and engaging
            cinematic techniques.
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Whether it's developing interactive installations, launching custom
            CMS-driven platforms, or collaborating on commercial and artistic
            projects, I bring technical expertise and creative vision to every
            step of the process.
          </p>
        </div>
        <div>
          <Image
            src="/shuacap.jpg"
            alt="Portrait of Shuacap or studio setup"
            width={500}
            height={500}
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
