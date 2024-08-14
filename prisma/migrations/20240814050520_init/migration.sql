-- CreateTable
CREATE TABLE "Boulders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "sector" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "ascensions" INTEGER NOT NULL
);
