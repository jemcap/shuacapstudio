import { ReactNode } from "react";

export type Video = {
    _id: string;
    title: string;
    url: string;
    location: string;
    year: string;
    host: string;
    s3Key: string;
    description: string;
}

export type Event = {
    _id: string;
    title: string;
    location?: string;
    tag: string[];
    s3Key: string;
}

export type PackageType = {
    name: string;
    description: string;
    price: number;
    _key: string;
  };
  
export type EventProps = {
    _id: string;
    title: string;
    location: string;
    tag: string[];
    url: string;
    packages: PackageType[];
  };

export type FilmProps = {
  _id: string;
  title: string;
  description: string;
  host: string;
  s3Key: string;
  url: string;
}
export type WorkReelProps = {
  _id: string;
  title: string;
  description: string;
  host?: string;
  client?: string;
  link?: string;
  s3Key: string;
  url: string;
}


export type ServiceProps = {
  title: string;
  price: number;
  audience: string;
  description: string;
  features: string[];
}