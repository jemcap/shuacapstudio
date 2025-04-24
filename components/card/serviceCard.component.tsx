import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { v4 as uuidv4 } from "uuid";

import { ServiceProps } from "@/types/types";

import { formatCurrency } from "@/lib/utils";

import { FaCheck } from "react-icons/fa";

const ServiceCard: React.FC<ServiceProps> = ({
  title,
  price,
  description,
  audience,
  features,
}) => {
  return (
    <>
      <Card className="flex flex-col justify-between w-full h-full bg-accent-foreground text-white border border-gray-700 shadow-lg rounded-2xl p-6">
        <CardHeader className="text-3xl">
          <CardTitle className="h-full">{title}</CardTitle>
          <CardTitle className="text-4xl">
            <span className="text-xl text-gray-400">from </span>
            {formatCurrency(price)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-10 h-full">
          <CardDescription>{description}</CardDescription>
          <CardDescription>
            <h2>Who is this for?</h2>
            {audience}
          </CardDescription>
          <CardDescription>
            <ul className="mt-5">
              {features.map((f) => (
                <li key={uuidv4()} className="flex items-center">
                  <FaCheck className="text-yellow-400 flex flex-1/3" />

                  <span className="w-2xl">{f}</span>
                </li>
              ))}
            </ul>
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="w-full text-black">
            Inquire
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ServiceCard;
