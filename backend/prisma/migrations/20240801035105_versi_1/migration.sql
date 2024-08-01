-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "avatar" TEXT NOT NULL,
    "coin" INTEGER NOT NULL,
    "diamond" INTEGER NOT NULL,
    "google_id" TEXT NOT NULL,
    "userAvatarId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "useravatars" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "avatarId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "useravatars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatars" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avatars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usermatches" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "ringking" INTEGER NOT NULL,
    "userId" TEXT,
    "matchId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usermatches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "useransweres" (
    "id" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "answere_time" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "userId" TEXT,
    "answereId" TEXT,
    "questionId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "useransweres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answeres" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "questionId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answeres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions " (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "max_score" INTEGER NOT NULL,
    "timer" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions _pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "useravatars_id_key" ON "useravatars"("id");

-- CreateIndex
CREATE UNIQUE INDEX "avatars_id_key" ON "avatars"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usermatches_id_key" ON "usermatches"("id");

-- CreateIndex
CREATE UNIQUE INDEX "matches_id_key" ON "matches"("id");

-- CreateIndex
CREATE UNIQUE INDEX "useransweres_id_key" ON "useransweres"("id");

-- CreateIndex
CREATE UNIQUE INDEX "answeres_id_key" ON "answeres"("id");

-- CreateIndex
CREATE UNIQUE INDEX "questions _id_key" ON "questions "("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_id_key" ON "invoices"("id");

-- AddForeignKey
ALTER TABLE "useravatars" ADD CONSTRAINT "useravatars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "useravatars" ADD CONSTRAINT "useravatars_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "avatars"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usermatches" ADD CONSTRAINT "usermatches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usermatches" ADD CONSTRAINT "usermatches_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "useransweres" ADD CONSTRAINT "useransweres_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "useransweres" ADD CONSTRAINT "useransweres_answereId_fkey" FOREIGN KEY ("answereId") REFERENCES "answeres"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "useransweres" ADD CONSTRAINT "useransweres_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions "("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answeres" ADD CONSTRAINT "answeres_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions "("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
