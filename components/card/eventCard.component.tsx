import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EventProps } from "@/types/types";

const EventCard: React.FC<EventProps> = ({ title, url, tag, packages }) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKey) return;
    const selectedPackage = packages.find((p) => p._key === selectedKey);
    if (!selectedPackage) return;

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "/api/checkout-session",
        {
          packageName: selectedPackage.name,
          price: selectedPackage.price,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = res.data;
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer hover:shadow-xl transition-all duration-300  ease-in-out">
        <Card className="w-full h-auto overflow-hidden border-2 mt-2 rounded-none">
          <div className="relative w-full h-80">
            <div className="absolute bottom-5 left-5 flex flex-row gap-2">
              {tag.map((t, idx) => (
                <small
                  key={idx}
                  className="text-white bg-black-200/40 backdrop-blur-xl py-1 px-4 rounded-full text-center"
                >
                  {t}
                </small>
              ))}
            </div>
            <img src={url} alt={title} className="object-cover w-full h-full" />
          </div>
          <CardHeader className="pb-5 ">
            <CardTitle className="text-lg lg:text-xl text-start">
              <h1>{title}</h1>
              <p className="text-gray-500 text-sm">
                from £
                <span>
                  {
                    packages
                      .map((p) => p.price)
                      .sort((a: number, b: number) => a - b)[0]
                  }
                </span>
              </p>
            </CardTitle>
          </CardHeader>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="relative w-full h-40">
          <img
            src={url}
            alt={title}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-5 mb-2">
          {packages.map((p) => (
            <button
              key={p._key}
              className={`bg-gray-200 p-2 rounded-lg text-sm hover:shadow-lg hover:bg-gray-300 transition-all ease-in-out ${selectedKey === p._key ? "bg-orange-300" : ""}`}
              onClick={() => setSelectedKey(p._key)}
            >
              {p.name}
            </button>
          ))}
        </div>

        {selectedKey && (
          <form onSubmit={handleConfirm} className="space-y-4">
            <div className="border-t pt-4">
              <h3 className="font-semibold">What you get in this package:</h3>
              <p className="mb-4">
                {packages.find((p) => p._key === selectedKey)?.description}
              </p>
              <div className="font-bold text-3xl mb-4">
                £{packages.find((p) => p._key === selectedKey)?.price}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Next"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventCard;
