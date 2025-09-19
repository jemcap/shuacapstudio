import { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EventProps, PackageType } from "@/types/types";

const EventCard = ({ title, coverImage, tag, packages }: EventProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const thumbnailUrl = coverImage?.asset?.url;

  const getCurrentPrice = (pkg: PackageType) => {
    return pkg.priceDiscount ?? pkg.price;
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKey) return;
    const selectedPackage = packages.find((p) => p._key === selectedKey);
    if (!selectedPackage) return;

    const priceToSend = getCurrentPrice(selectedPackage);

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "/api/checkout-session",
        {
          packageName: selectedPackage.name,
          price: priceToSend,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out w-full">
        <Card className="w-full h-full overflow-hidden border-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="relative w-full h-48 sm:h-56 md:h-64">
            <div className="absolute bottom-3 left-3 flex flex-row gap-2 z-10">
              {tag.map((t, idx) => (
                <small
                  key={idx}
                  className="text-white bg-black/60 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-medium"
                >
                  {t}
                </small>
              ))}
            </div>
            <img
              src={thumbnailUrl}
              alt={title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
          <CardHeader className="p-4 pb-6">
            <CardTitle className="text-base sm:text-lg text-start">
              <h1 className="line-clamp-2 mb-2">{title}</h1>
              <p className="text-gray-500 text-sm font-normal">
                from £
                <span className="font-semibold">
                  {(() => {
                    const sorted = [...packages].sort((a, b) => {
                      const aPrice = getCurrentPrice(a);
                      const bPrice = getCurrentPrice(b);
                      return aPrice - bPrice;
                    });
                    const price = sorted[0];
                    return price.priceDiscount ? (
                      <>
                        {price.priceDiscount}{" "}
                        <span className="line-through text-gray-400 font-normal">
                          £{price.price}
                        </span>
                      </>
                    ) : (
                      price.price
                    );
                  })()}
                </span>
              </p>
            </CardTitle>
          </CardHeader>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="relative w-full h-40">
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 object-cover w-full h-full"
            loading="lazy"
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

        {selectedKey &&
          (() => {
            const selectedPackage = packages.find(
              (p) => p._key === selectedKey
            );
            const discountedPrice = selectedPackage?.priceDiscount;

            return (
              <form onSubmit={handleConfirm} className="space-y-4">
                <div className="border-t pt-4">
                  <h3 className="font-semibold">
                    What you get in this package:
                  </h3>
                  <p className="mb-4">{selectedPackage?.description}</p>

                  <div className="font-bold text-3xl mb-4">
                    {discountedPrice ? (
                      <>
                        £{discountedPrice}{" "}
                        <span className="line-through text-gray-300">
                          £{selectedPackage?.price}
                        </span>
                      </>
                    ) : (
                      <>£{selectedPackage?.price}</>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Next"}
                  </Button>
                </div>
              </form>
            );
          })()}
      </DialogContent>
    </Dialog>
  );
};

export default EventCard;
