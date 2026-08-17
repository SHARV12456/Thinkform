-- CreateTable AdminSettings
CREATE TABLE IF NOT EXISTS "AdminSettings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "AdminSettings_key_key" ON "AdminSettings"("key");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "AdminSettings_key_idx" ON "AdminSettings"("key");
