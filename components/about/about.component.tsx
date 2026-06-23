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
          <h1 className="text-4xl font-semibold mb-4">
            Get Known. I&apos;ll Create the Content.
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            I&apos;m Josh, a cinematographer and filmmaker with a deep passion
            for creating authentic, story-driven content. With years of
            experience as a creative in the digital space, I understand both the
            visual and user experience dimensions of a brand, event, or
            community—and I translate that understanding into compelling visual
            stories that resonate. Whether I&apos;m filming brands, events,
            people, or creative campaigns, I aim to create work that feels
            intentional, cinematic, and true to the story being told.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            I obsess over the details that matter—understanding your vision
            deeply and delivering exactly what you need. My product design and
            software development background gives me an eye for how everything
            connects, ensuring every element works together to serve your story.
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
                    Please fill out the form below, and I&apos;ll get back to
                    you as soon as I can!
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
        <div className="flex-1 relative min-h-[500px]">
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
