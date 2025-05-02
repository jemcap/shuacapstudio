import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";

import { v4 as uuidv4 } from "uuid";

import { ServiceProps } from "@/types/types";

import { formatCurrency } from "@/lib/utils";

import { FaCheck } from "react-icons/fa";
import InquiryForm from "../form/inquiry.component";

const ServiceCard: React.FC<ServiceProps> = ({
  title,
  price,
  description,
  audience,
  features,
}) => {
  return (
    <>
      <Dialog>
        <Card className="flex flex-col justify-between w-full h-full bg-gray-50  border-gray-200 shadow-lg rounded-2xl py-8 hover:shadow-xl transition-all 3s ease-in-out border-2">
          <CardHeader className="text-2xl">
            <CardTitle className="h-full text-accent-foreground">
              {title}
            </CardTitle>
            <CardTitle className="text-3xl text-orange-500">
              <span className="text-sm text-gray-500">from </span>
              {formatCurrency(price)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-7 h-full ">
            <CardDescription className="text-black">
              {description}
            </CardDescription>
            <CardDescription className="text-black">
              <h2 className="font-semibold">Who is this for?</h2>
              {audience}
            </CardDescription>
            <CardDescription className="text-black">
              <h2 className="font-semibold">What's included:</h2>
              <ul className="mt-2 space-y-2">
                {features.map((f) => (
                  <li key={uuidv4()} className="flex items-center">
                    <FaCheck className="text-green-500 flex flex-1/6" />

                    <span className="w-2xl">{f}</span>
                  </li>
                ))}
              </ul>
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between">
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-black cursor-pointer"
              >
                Inquire
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Inquire about {title}
            </DialogTitle>
            <DialogDescription>
              Please fill out the form and I'll get back to you ASAP!
            </DialogDescription>
          </DialogHeader>
          <InquiryForm packageName={title} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceCard;
