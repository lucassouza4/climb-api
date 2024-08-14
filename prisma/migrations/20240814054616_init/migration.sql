/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Boulders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Boulders_key_key" ON "Boulders"("key");
