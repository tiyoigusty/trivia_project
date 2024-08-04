/*
  Warnings:

  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "avatars" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar";
