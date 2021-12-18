/*
  Warnings:

  - Added the required column `ownerId` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "ownerId" INTEGER NOT NULL DEFAULT 1;


-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
