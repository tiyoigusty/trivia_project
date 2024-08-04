/*
  Warnings:

  - You are about to drop the column `is_active` on the `avatars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "avatars" DROP COLUMN "is_active";

-- AlterTable
ALTER TABLE "useravatars" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false;
