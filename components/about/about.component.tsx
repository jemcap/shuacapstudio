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

import { Button } from "@/components/ui/button";
import ContactForm from "../form/contact.component";

const AboutMe = () => {
  return (
    <section className="align-element">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-stretch min-h-[95vh] py-20">
        <div className="flex-1 lg:border-r-2 lg:pr-10 flex flex-col justify-center text-left">
          <h1 className="text-4xl font-bold mb-4">
            Get Known. I&apos;ll Create the Content.
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            I&apos;m Josh, a videographer and filmmaker with a huge passion for
            creating authentic, story-driven content. With a background as a
            long-time creative in the digital space, I&apos;m able to quickly
            understand the intricate details of a brand, event, or community and
            translate them into compelling visual stories. My experience as an
            athlete gives me a strong instinct for capturing movement, emotion,
            and human performance, but my focus extends beyond sport. Whether
            I&apos;m filming brands, events, people, or creative campaigns, I
            aim to create work that feels intentional, cinematic, and true to
            the story being told.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            I merge the creative intuition with technical expertise, building
            engaging videos and digital experiences designed not just to be
            seen, but to be felt, driving the growth and loyalty your brand
            deserves.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Let&apos;s collaborate to elevate your brand through the power of
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
                  <DialogTitle>Let&apos;s Work!</DialogTitle>
                  <DialogDescription>
                    Please fill out the form below, and I&apos;ll get back to you as
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
        <div className="flex-1 relative min-h-[300px]">
          <Image
            src="/me_work.png"
            alt="Portrait of Shuacap or studio setup"
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
