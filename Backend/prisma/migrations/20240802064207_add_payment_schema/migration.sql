-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "bank" TEXT,
    "amount" TEXT,
    "status" TEXT,
    "midtrans_order_id" TEXT,
    "users_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_id_key" ON "payments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_midtrans_order_id_key" ON "payments"("midtrans_order_id");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
