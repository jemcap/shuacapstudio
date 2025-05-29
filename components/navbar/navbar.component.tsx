"use client";

import { useState, useRef, useEffect } from "react";
import Navigation from "./navigation.component";
import { current } from "@reduxjs/toolkit";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`px-5 fixed py-3 w-full font-work-sans mix-blend-difference bg-black/80 backdrop-blur-sm z-50 transition-transform duration-300 ${
        isScrolled ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        backgroundColor: "rgba(0,0,0,0.8)",
        WebkitBackdropFilter: "blur(10px)",
        backdropFilter: "blur(10px)",
      }}
    >
      <nav className="flex justify-between items-center align-element ">
        <Navigation />
      </nav>
    </header>
  );
};

export default Navbar;
