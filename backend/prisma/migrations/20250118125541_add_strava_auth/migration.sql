-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StravaAuth" (
    "userId" INTEGER NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "athleteId" INTEGER NOT NULL,
    "premium" BOOLEAN NOT NULL,
    "summit" BOOLEAN NOT NULL,
    "createdAtStrava" TIMESTAMP(3) NOT NULL,
    "updatedAtStrava" TIMESTAMP(3) NOT NULL,
    "badgeTypeId" INTEGER NOT NULL,

    CONSTRAINT "StravaAuth_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "StravaAuth" ADD CONSTRAINT "StravaAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
