"use client";

import { useState, useEffect } from "react";

import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const ServiceComponent = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  const sentences = [
    "Visual Communication",
    "Creative Solutions", 
    "Brand Narratives",
    "User Experience",
    "Visual Impact",
  ];

  const currentSentence = sentences[currentSentenceIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      if (displayedText.length < currentSentence.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentSentence.slice(0, displayedText.length + 1));
        }, 150); 
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 100); 
      } else {
        setIsFadingOut(true);
        timeout = setTimeout(() => {
          setIsVisible(false);
          setIsFadingOut(false);
          setTimeout(() => {
            setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length);
            setIsTyping(true);
            setIsVisible(true);
          }, 200);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, currentSentence, sentences.length]);

  return (
    <div className="min-h-screen">
      <section className="relative w-full h-[60vh] lg:h-[70vh] mb-16">
        <img
          src="https://shuacapstudio-assets.s3.eu-west-2.amazonaws.com/shuacapstudio_banner.png"
          alt="Shuacap Studio logo"
          className="w-screen h-full object-cover"
          loading="lazy"
        />
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.3,
          }}
        >
          {isVisible && (
            <motion.div 
              className="bg-black/80 backdrop-blur-md max-w-4xl shadow-2xl border border-white/10 px-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: isFadingOut ? 0 : 1, 
                scale: isFadingOut ? 0.9 : 1,
                y: 0
              }}
              transition={{ 
                duration: isFadingOut ? 0.5 : 0.3,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="text-center"
                initial={{ opacity: 1, y: 0 }}
                animate={{ 
                  opacity: isFadingOut ? 0 : 1, 
                  y: 0
                }}
                transition={{
                  duration: isFadingOut ? 0.4 : 0,
                  ease: "easeOut",
                  delay: 0,
                }}
              >
                <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold uppercase">
                  <span style={{ opacity: 1 }}>
                    {displayedText}
                    <motion.span
                      className="inline-block ml-1"
                      animate={{ 
                        opacity: isFadingOut ? 0 : [1, 0, 1]
                      }}
                      transition={{
                        duration: isFadingOut ? 0.2 : 1,
                        repeat: isFadingOut ? 0 : Infinity,
                        ease: "linear",
                      }}
                    >
                      |
                    </motion.span>
                  </span>
                </h1>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* About Services Section */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="uppercase text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            creative solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
            A creative business aimed at crafting compelling visual content that tells a unique narrative. 
            From cinematic videography to modern web design, our comprehensive creative services are designed to 
            elevate your brand and connect with your audience. Whether you're looking to capture special moments, 
            build an engaging digital presence, or create content that drives results, we combine technical 
            expertise with creative vision to deliver solutions that exceed expectations.
          </p>
        </motion.div>
      </section>


      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-left mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="uppercase text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Services
          </h2>

        </motion.div>


        <div className="space-y-12">
          {/* Videography */}
          <motion.div
            className="border-b border-gray-200 pb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Videography</h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
              Cinematic video production from concept to final edit, including promotional videos, event coverage, and brand storytelling. I create visual narratives that capture your vision and engage your audience.
            </p>
          </motion.div>

          {/* Content Creation */}
          <motion.div
            className="border-b border-gray-200 pb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Content Creation</h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
              Strategic content development for social media, marketing campaigns, and digital platforms that engage and convert audiences. From concept to execution, I generate content that tells your story effectively.
            </p>
          </motion.div>

          {/* Web Design & Development */}
          <motion.div
            className="pb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Web Design & Development</h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
              Modern, responsive websites and web applications built with cutting-edge technologies and user-centered design principles. With a background in Product Design and Web Development, I create digital experiences that are both beautiful and functional.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ServiceComponent;
