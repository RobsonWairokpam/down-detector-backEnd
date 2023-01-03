/*
  Warnings:

  - You are about to drop the column `data` on the `RecordAll` table. All the data in the column will be lost.
  - Added the required column `tom` to the `RecordAll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecordAll" DROP COLUMN "data",
ADD COLUMN     "records" JSONB,
ADD COLUMN     "tom" TEXT NOT NULL;
