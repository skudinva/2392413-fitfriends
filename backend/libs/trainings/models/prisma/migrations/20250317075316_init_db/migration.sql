-- CreateTable
CREATE TABLE "trainings" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "trainer" TEXT NOT NULL,
    "is_special" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "training_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "training_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "payment_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "comments_training_id_user_id_key" ON "comments"("training_id", "user_id");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
