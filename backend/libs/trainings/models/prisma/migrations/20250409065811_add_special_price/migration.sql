/*
  Warnings:

  - Added the required column `special_price` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "special_price" INTEGER NOT NULL;
