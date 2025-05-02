"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "react-toastify";
import axios from "axios";

const formSchema = z.object({
  package: z.string().min(0, "Package must be inputted"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  eventDate: z.coerce.date({
    required_error: "Please select an event date",
    invalid_type_error: "Invalid date format",
  }),
  eventLocation: z.string().min(5, "Please provide an event location"),
  additionalDetails: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const InquiryForm = ({ packageName }: { packageName: string }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      package: packageName,
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      eventLocation: "",
      additionalDetails: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            setIsSubmitting(true);
            try {
              const response = await axios.post(
                "api/inquiry",
                { ...values, packageName },
                {
                  headers: { "Content-Type": "application/json" },
                }
              );
              toast.success("Inquiry sent successfully!");
              form.reset();
            } catch (error) {
              if (error instanceof Error) {
                toast.error(
                  "Oops, something went wrong. Please try again later."
                );
                throw new Error(error.message);
              }
            } finally {
              setIsSubmitting(false);
            }
          })}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    aria-required="true"
                    placeholder="John Doe"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} aria-required="true" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input {...field} aria-required="true" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={
                      field.value
                        ? new Date(field.value).toISOString().substring(0, 10)
                        : ""
                    }
                    onChange={(e) => field.onChange(e.target.value)}
                    aria-required="true"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Event Location (input "Remote" if it is remote work)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    aria-placeholder="Enter full address or venue"
                    placeholder="Enter full address or venue"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Details</FormLabel>
                <FormControl>
                  <Textarea {...field} aria-required="false" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default InquiryForm;
