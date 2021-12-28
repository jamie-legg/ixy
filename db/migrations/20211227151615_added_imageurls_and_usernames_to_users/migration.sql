/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT E'https://cdn.discordapp.com/attachments/671848184938758155/925044142550163456/ixysmile.png',
ADD COLUMN     "username" TEXT NOT NULL DEFAULT E'user';
