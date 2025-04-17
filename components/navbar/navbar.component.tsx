import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavigationList } from "./navigation-menu.component";

const Navbar: React.FC = async () => {
  return (
    <header className="px-5 py-3 bg-black font-work-sans ">
      <nav className="flex justify-between items-center align-element">
        <Link href="/">
          <Image
            src="/shuacapstudio-logo.png"
            alt="logo"
            width={144}
            height={144}
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
