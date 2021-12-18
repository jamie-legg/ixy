/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `streamId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('BASIC', 'ADVANCED', 'PRO');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "streamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserType" NOT NULL DEFAULT E'BASIC';

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
