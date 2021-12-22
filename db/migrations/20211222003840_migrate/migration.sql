/*
  Warnings:

  - Added the required column `messageId` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "messageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "messageCount" INTEGER DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
