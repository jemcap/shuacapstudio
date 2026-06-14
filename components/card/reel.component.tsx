"use client";

import { WorkReelProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const Reel = ({ info }: { info: WorkReelProps[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {info.map((content) => {
        const href = `/work/${content.slug}`;
        const imageSrc = content.thumbnail?.url ?? content.url;
        const imageAlt = content.thumbnail?.alt ?? content.title;

        if (!imageSrc) return null;

        const CardInner = (
          <div className="group cursor-pointer">
            <div className="relative w-full aspect-video overflow-hidden bg-black">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
            </div>
            <div className="mt-4">
              <h2 className="text-sm font-light text-gray-900 leading-tight">
                {content.host}
              </h2>
              <h2 className="text-2xl font-semibold tracking-wide text-gray-900 leading-tight">
                {content.title}
              </h2>
              {content.year && (
                <span className="block text-xs text-gray-400 uppercase tracking-widest mt-1">
                  {content.year}
                </span>
              )}
            </div>
          </div>
        );

        return content.link ? (
          <a
            key={content._id}
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {CardInner}
          </a>
        ) : (
          <Link key={content._id} href={href}>
            {CardInner}
          </Link>
        );
      })}
    </div>
  );
};

export default Reel;
