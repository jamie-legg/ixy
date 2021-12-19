-- CreateEnum
CREATE TYPE "StreamType" AS ENUM ('PUBLIC', 'PRIVATE', 'AI', 'FRIENDS');

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "type" "StreamType" NOT NULL DEFAULT E'PUBLIC';
