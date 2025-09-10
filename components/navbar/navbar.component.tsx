"use client";

import { useState, useRef, useEffect } from "react";
import Navigation from "./navigation.component";

const Navbar = () => {
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
      className={`px-5 fixed py-3 w-full font-work-sans bg-black z-50 transition-transform duration-300 ${
        isScrolled ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className=" align-element ">
        <Navigation />
      </nav>
    </header>
  );
};

export default Navbar;
