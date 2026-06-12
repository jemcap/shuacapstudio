import React from "react";
import { getWorkBySlug } from "@/lib/work";
import { notFound } from "next/navigation";

interface WorkIdPageProps {
  params: Promise<{ workId: string }>;
}

export const revalidate = 60;

export default async function WorkIdPage({ params }: WorkIdPageProps) {
  const { workId } = await params;
  const slug = decodeURIComponent(workId);
  const content = await getWorkBySlug(slug);

  if (!content) {
    notFound();
  }

  return (
    <div className="h-full">
      <div>
        <div className="space-y-4">
          {content.videoUrl && (
            <video
              controls
              muted
              loop
              controlsList="nodownload"
              className="w-full h-[90vh] object-contain bg-black"
              preload="metadata"
            >
              <source src={content.videoUrl} type="video/mp4" />
            </video>
          )}
          <div className="h-full space-y-20 ">
            <div className="align-element py-10 space-y-20">
              <div className=" gap-10 lg:gap-20 grid grid-cols-1 lg:grid-cols-2 border-b-2 pb-20">
                <div>
                  <p className="text-gray-400  text-xl">Title</p>
                  <h1 className="text-3xl font-bold">{content.title}</h1>
                </div>

                {content.host && (
                  <div>
                    <p className="text-gray-400  text-xl">Host</p>
                    <h1 className="text-3xl font-bold">{content.host}</h1>
                  </div>
                )}
                {content.client && (
                  <div>
                    <p className="text-gray-400  text-xl">Client</p>
                    <h1 className="text-3xl font-bold">{content.client}</h1>
                  </div>
                )}
                {content.location && (
                  <div>
                    <p className="text-gray-400  text-xl">Location</p>
                    <h1 className="text-3xl font-bold">{content.location}</h1>
                  </div>
                )}
                {content.year && (
                  <div>
                    <p className="text-gray-400  text-xl">Year</p>
                    <h1 className="text-3xl font-bold">{content.year}</h1>
                  </div>
                )}
                {content.link && (
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-3xl font-bold"
                  >
                    View Project
                  </a>
                )}
              </div>
              {content.description && (
                <section className="flex flex-col">
                  <p className="text-gray-400  text-xl">Description</p>
                  <h2 className="text-2xl mb-20">{content.description}</h2>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
