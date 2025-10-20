import React from "react";
import Image from "next/image";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ContactForm from "../form/contact.component";

const AboutMe = () => {
  return (
    <section className="align-element my-20">
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
        <div className="lg:border-r-2 lg:pr-10 max-w-xl text-left">
          <h1 className="text-4xl font-bold mb-4">
            Get Known. I'll Create the Content.
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            I'm Josh, a competitive powerlifter and the founder of Shuacap
            Studio. I launched this video production business to bridge the gap
            between brands and the true essence of the sports community. My
            experience as an athlete across a variety of sports isn't just a
            passion—it's a strategic advantage. It allows me to create
            authentic, compelling content that speaks the language of athletes
            and sports enthusiasts alike.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            I merge the creative intuition with technical expertise, building
            engaging videos and digital experiences designed not just to be
            seen, but to be felt, driving the growth and loyalty your brand
            deserves.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Let's collaborate to elevate your brand through the power of
            authentic storytelling and innovative digital solutions.
          </p>
          <Dialog>
            <form>
              <DialogTrigger asChild className="mt-5 bg-orange-500">
                <Button
                  variant="outline"
                  className="text-white text-md font-bold px-10 py-5 max-md:w-full"
                >
                  Get in Touch
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Let's Work!</DialogTitle>
                  <DialogDescription>
                    Please fill out the form below, and I'll get back to you as
                    soon as I can!
                  </DialogDescription>
                </DialogHeader>
                <ContactForm />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
        <div>
          <Image
            src="/shuacap.jpg"
            alt="Portrait of Shuacap or studio setup"
            width={500}
            height={500}
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
