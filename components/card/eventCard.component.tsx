"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { PackageType } from "@/types/types";
import Link from "next/link";

import { useState } from "react";

const EventCard = ({
  title,
  tag,
  url,
  packages,
}: {
  title: string;
  location: string;
  tag: string[];
  url: string;
  packages: PackageType[];
}) => {
  const [selected, setSelected] = useState<string | null>("");

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <Card className="w-full h-full overflow-hidden border-2 mt-5">
          <div className="relative w-full h-40">
            <img src={url} alt={title} className="object-cover w-full h-full" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg lg:text-xl text-start">
              {title}
            </CardTitle>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="relative w-full h-40">
            <img src={url} alt={title} className="object-cover w-full h-full" />
          </div>
          <DialogTitle className="text-3xl">{title}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-5 ">
          {packages &&
            packages.map((p) => (
              <button
                key={p._key}
                className={`bg-gray-200 p-2 rounded-lg text-sm cursor-pointer hover:shadow-2xl hover:bg-gray-300 transition-all ease-in-out ${selected === p._key ? "bg-orange-300" : ""}`}
                onClick={() => {
                  setSelected(p._key);
                }}
              >
                {p.name}
              </button>
            ))}
        </div>
        {selected &&
          (() => {
            const selectedPackage = packages.find((p) => p._key === selected);
            if (!selectedPackage) return null;

            const handleConfirm = async () => {
              const res = await fetch("/api/checkout-session", {
                method: "POST",
                body: JSON.stringify({
                  packageName: selectedPackage.name,
                  price: selectedPackage.price,
                }),
                headers: { "Content-Type": "application/json" },
              });
              const data = await res.json();
              window.location.href = data.url;
            };

            return (
              <div className="border-t-2">
                <div className="py-5">
                  <h3 className="font-semibold">
                    What you get in this package:
                  </h3>
                  <div>{selectedPackage.description}</div>
                </div>
                <div className="font-semibold text-3xl">
                  <h4>£{selectedPackage.price}</h4>
                </div>
                <div className="mt-7 border-2">
                  <Button
                    className="font-semibold text-xl cursor-pointer w-full"
                    onClick={handleConfirm}
                  >
                    Next
                  </Button>
                </div>
              </div>
            );
          })()}
      </DialogContent>
    </Dialog>
  );
};

export default EventCard;
