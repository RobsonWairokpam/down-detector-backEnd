-- CreateTable
CREATE TABLE "RecordAll" (
    "iid" SERIAL NOT NULL,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecordAll_pkey" PRIMARY KEY ("iid")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecordAll_iid_key" ON "RecordAll"("iid");
