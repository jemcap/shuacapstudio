import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

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
        <Card className="flex flex-col justify-between w-full h-full bg-gray-100  border-gray-700 shadow-lg rounded-2xl p-6">
          <CardHeader className="text-4xl lg:text-2xl">
            <CardTitle className="h-full text-accent-foreground">
              {title}
            </CardTitle>
            <CardTitle className="text-4xl lg:text-2xl text-gray-500 mt-2 ">
              <span className="text-sm text-gray-500">from </span>
              {formatCurrency(price)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 h-full ">
            <CardDescription className="text-black">
              {description}
            </CardDescription>
            <CardDescription className="text-black">
              <h2 className="font-semibold">Who is this for?</h2>
              {audience}
            </CardDescription>
            <CardDescription className="text-black">
              <ul className="mt-5">
                {features.map((f) => (
                  <li key={uuidv4()} className="flex items-center">
                    <FaCheck className="text-yellow-500 flex flex-1/3" />

                    <span className="w-2xl">{f}</span>
                  </li>
                ))}
              </ul>
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between">
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full text-black">
                Inquire
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <h2 className="text-2xl font-bold">Inquire about {title}</h2>
          <p>Fill out the form and we'll get back to you ASAP!</p>
          <InquiryForm packageName={title} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceCard;
