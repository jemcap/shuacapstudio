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

const EventCard: React.FC<EventProps> = ({ title, url, packages }) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [flight, setFlight] = useState("");
  const [athleteDesc, setAthleteDesc] = useState("");
  const [songLink, setSongLink] = useState("");
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
          fullName,
          email,
          flight,
          athleteDesc,
          songLink: selectedPackage.name === "Premium" ? songLink : undefined,
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
      <DialogTrigger className="cursor-pointer">
        <Card className="w-full h-full overflow-hidden border-2 mt-2">
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

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="relative w-full h-40">
            <img src={url} alt={title} className="object-cover w-full h-full" />
          </div>
        </DialogHeader>
        <DialogTitle className="text-3xl mb-4">{title}</DialogTitle>

        <div className="flex flex-wrap gap-5 mb-6">
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
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Which Flight?</label>
              <input
                type="text"
                required
                placeholder="e.g., Flight 1"
                value={flight}
                onChange={(e) => setFlight(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Describe yourself (e.g., red singlet)
              </label>
              <input
                type="text"
                required
                placeholder="e.g., red singlet, yellow lifters"
                value={athleteDesc}
                onChange={(e) => setAthleteDesc(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
              />
            </div>

            {packages
              .find((p) => p._key === selectedKey)
              ?.name.includes("Premium") && (
              <div>
                <label className="block text-sm font-medium">
                  Music of choice
                </label>
                <input
                  type="url"
                  placeholder="Song — Artist/Band"
                  value={songLink}
                  onChange={(e) => setSongLink(e.target.value)}
                  className="mt-1 block w-full border rounded p-2"
                />
              </div>
            )}

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
