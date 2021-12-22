/*
  Warnings:

  - You are about to drop the column `messageId` on the `Reply` table. All the data in the column will be lost.
  - Added the required column `streamId` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_messageId_fkey";

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "messageId",
ADD COLUMN     "streamId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
