/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Order";

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "training_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "payment_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
