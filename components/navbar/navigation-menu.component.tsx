"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";

export function NavigationList() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  const [open, setOpen] = React.useState(false);

  return (
    <nav>
      {/* Desktop Nav */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex justify-center">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button aria-label="Open menu">
              <Menu className="w-8 h-8" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
            <Dialog.Title className="text-white">Hello</Dialog.Title>
            <Dialog.Content className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-black text-white z-50 shadow-lg flex flex-col p-6">
              <div className="flex justify-end mb-8">
                <Dialog.Close asChild>
                  <button aria-label="Close menu">
                    <X className="w-8 h-8" />
                  </button>
                </Dialog.Close>
              </div>
              <nav className="flex flex-col justify-end items-end gap-6 py-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-3xl font-semibold hover:text-orange-500 transition"
                    onClick={() => setOpen(false)} // Properly closes the modal
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </nav>
  );
}
