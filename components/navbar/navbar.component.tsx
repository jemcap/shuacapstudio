import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavigationList } from "./navigation-menu.component";
import Navigation from "./navigation.component";

const Navbar: React.FC = async () => {
  return (
    <header
      className="px-5 fixed py-3 w-full font-work-sans mix-blend-difference bg-black/80 backdrop-blur-sm z-50"
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
