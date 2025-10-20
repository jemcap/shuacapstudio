"use client";

import { WorkReelProps } from "@/types/types";
import Link from "next/link";

const Reel = ({ info }: { info: WorkReelProps[] }) => {
  // Define predefined height patterns for Pinterest-style masonry
  const heightPatterns = [
    'h-64',   // 256px - small
    'h-80',   // 320px - medium
    'h-96',   // 384px - large
    'h-[400px]', // 400px - extra large
    'h-72',   // 288px - medium-small
    'h-[350px]', // 350px - large-medium
  ];

  const getItemHeight = (index: number) => {
    return heightPatterns[index % heightPatterns.length];
  };

  return (
    <section className="align-element">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {info.map((content, index) => {
          const href = `/work/${content.title}`;
          const itemHeight = getItemHeight(index);

          const CardInner = (
            <div className="group cursor-pointer break-inside-avoid mb-6">
              <div className={`w-full overflow-hidden  bg-black ${itemHeight}`}>
                <img
                  src={content.url}
                  alt={content.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 px-1">
                {content.host && (
                  <span className="block text-xs text-gray-500 mb-1 uppercase tracking-widest">
                    {content.host}
                  </span>
                )}
                {content.client && (
                  <span className="block text-xs text-gray-400 mb-2">
                    {content.client}
                  </span>
                )}
                <h2 className="text-xl font-semibold leading-tight hover:text-gray-600 transition-colors">
                  {content.title}
                </h2>
              </div>
            </div>
          );

          return content.link ? (
            <a
              key={content._id}
              href={content.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {CardInner}
            </a>
          ) : (
            <Link key={content._id} href={href} className="block">
              {CardInner}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Reel;
