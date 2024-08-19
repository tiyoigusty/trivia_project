/*
  Warnings:

  - You are about to drop the column `max_score` on the `questions ` table. All the data in the column will be lost.
  - You are about to drop the column `answere_time` on the `useransweres` table. All the data in the column will be lost.
  - You are about to drop the column `is_correct` on the `useransweres` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `useransweres` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "questions " DROP COLUMN "max_score";

-- AlterTable
ALTER TABLE "useransweres" DROP COLUMN "answere_time",
DROP COLUMN "is_correct",
DROP COLUMN "score";
