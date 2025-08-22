import React from "react";
import Image from "next/image";

const AboutMe = () => {
  return (
    <section className="align-element my-20">
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
        <div className="lg:border-r-2 lg:pr-10 max-w-xl text-left">
          <h1 className="text-4xl font-bold mb-4">Shuacap Studio</h1>
            <p className="text-lg leading-relaxed text-gray-700">
            I'm Josh, owner of Shuacap Studio — a digital marketing business specialising in sports media. 
            As a sports enthusiast and current powerlifter with prior experience across a range of sports, 
            I bring authentic passion and understanding to every project. My mission is to help businesses scale through immersive content and cutting-edge digital solutions. 
            I combine technical expertise with creative storytelling to deliver engaging video content 
            and digital experiences that capture your audience's attention.
            </p>
            <p className="mt-4 text-lg text-gray-600">
            From sports highlights to commercial campaigns, I create content that drives engagement 
            and helps your brand stand out in today's competitive market.
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
