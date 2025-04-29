import ContactForm from "@/components/form/contact.component";
import React from "react";

const Contact = () => {
  return (
    <div className="h-screen align-element flex justify-center items-center">
      <div className="w-full flex justify-between gap-10 lg:flex-row flex-col">
        <div className="flex flex-col flex-1 lg:border-r-2 justify-center">
          <small>Reach out</small>
          <h1 className="text-3xl font-bold">I'm here to help</h1>
          <p className="text-gray-500">
            Please fill out the form, and I'll get back to you soon.
          </p>
        </div>
        <div className="w-full flex-1">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
