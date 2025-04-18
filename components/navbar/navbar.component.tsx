import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavigationList } from "./navigation-menu.component";

const Navbar: React.FC = async () => {
  return (
    <header className="px-5 py-3  font-work-sans backdrop-filter backdrop-blur-sm">
      <nav className="flex justify-between items-center align-element ">
        <Link href="/">
          <Image
            src="/shuacapstudio-logo.png"
            alt="logo"
            width={75}
            height={75}
          />
        </Link>

        <div className="flex items-center gap-5 text-white">
          <NavigationList />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
