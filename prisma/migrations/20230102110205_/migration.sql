-- CreateTable
CREATE TABLE "Records" (
    "iid" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Records_pkey" PRIMARY KEY ("iid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Records_iid_key" ON "Records"("iid");
