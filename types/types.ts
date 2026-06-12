export type Video = {
  _id: string;
  title: string;
  url: string;
  location?: string;
  year: string;
  host?: string;
  s3Key: string;
  description: string;
};

export type Event = {
  _id: string;
  title: string;
  location?: string;
  tag: string[];
  coverImage: {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
    caption?: string;
  };
};

export type PackageType = {
  name: string;
  description: string;
  price: number;
  priceDiscount?: number;
  earlyBirdPrice?: number;
  earlyBirdStart?: number | Date;
  earlyBirdEnd?: number | Date;
  _key: string;
};

export type EventProps = {
  _id: string;
  title: string;
  location: string;
  tag: string[];
  coverImage: {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
    caption?: string;
  };
  packages: PackageType[];
};

export type WorkType = "film" | "video" | "website";

export type WorkThumbnail = {
  url: string;
  alt: string;
};

export type WorkReelProps = {
  _id: string;
  type?: WorkType;
  title: string;
  slug: string;
  description?: string;
  host?: string;
  client?: string;
  location?: string;
  year?: string;
  link?: string;
  s3Key?: string;
  thumbnail?: WorkThumbnail;
  videoUrl?: string;
  url?: string;
};

export type ServiceProps = {
  title: string;
  price: number;
  audience: string;
  description: string;
  features: string[];
};
