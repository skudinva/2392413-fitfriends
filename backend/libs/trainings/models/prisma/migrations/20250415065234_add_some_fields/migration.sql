/*
  Warnings:

  - Added the required column `done_count` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_done` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_started` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "done_count" INTEGER NOT NULL,
ADD COLUMN     "is_done" BOOLEAN NOT NULL,
ADD COLUMN     "is_started" BOOLEAN NOT NULL;
