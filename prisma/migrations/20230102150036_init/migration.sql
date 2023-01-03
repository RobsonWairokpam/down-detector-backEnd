/*
  Warnings:

  - The `data` column on the `RecordAll` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "RecordAll" DROP COLUMN "data",
ADD COLUMN     "data" JSONB;
