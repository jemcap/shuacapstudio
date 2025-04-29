-- CreateTable
CREATE TABLE "WorkReel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "host" TEXT,
    "client" TEXT,
    "link" TEXT,
    "s3Key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkReel_pkey" PRIMARY KEY ("id")
);
