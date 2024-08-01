-- AlterTable
ALTER TABLE "avatars" ADD COLUMN     "coin" INTEGER,
ADD COLUMN     "diamond" INTEGER;

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "diamondId" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "coin" SET DEFAULT 0,
ALTER COLUMN "diamond" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_diamondId_fkey" FOREIGN KEY ("diamondId") REFERENCES "diamonds"("id") ON DELETE SET NULL ON UPDATE CASCADE;
