import ContactForm from "@/components/form/contact.component";
import React from "react";

const Contact = () => {
  return (
    <div className="w-full">
      <section className="w-full px-8 pt-36">
        <h1 className="text-black text-7xl tracking-tight leading-none">
          Contact
        </h1>
      </section>
      <section className="w-full px-8 py-16">
        <div className="w-full flex justify-between gap-10 lg:flex-row flex-col">
          <div className="flex flex-col flex-1 lg:border-r-2 justify-center gap-2">
            <small className="uppercase tracking-[0.25em] text-xs text-gray-400">Reach out</small>
            <h2 className="text-2xl font-bold">I&apos;m here to help</h2>
            <p className="text-gray-500">
              Please fill out the form, and I&apos;ll get back to you soon.
            </p>
          </div>
          <div className="w-full flex-1">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
