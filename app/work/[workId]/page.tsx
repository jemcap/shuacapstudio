import React from "react";
import prisma from "@/lib/prisma";

interface WorkIdPageProps {
  params: { workId: string };
}

export default async function WorkIdPage({ params }: WorkIdPageProps) {
  const { workId } = await params;
  const decodedTitle = decodeURIComponent(workId);

  const content = await prisma.workReel.findUnique({
    where: { title: decodedTitle },
  });

  console.log(content);

  if (!content) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-xl">Work not found</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div>
        <div className="space-y-4">
          <video controls muted loop className="w-full h-[750px] object-cover">
            <source src={content.url} type="video/mp4" />
          </video>
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
                {content.link && (
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-3xl font-bold"
                  >
                    Watch on YouTube
                  </a>
                )}
              </div>
              <section className="flex flex-col">
                <p className="text-gray-400  text-xl">Description</p>
                <h2 className="text-2xl">{content.description}</h2>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
