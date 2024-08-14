/*
  Warnings:

  - The primary key for the `Boulders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `key` to the `Boulders` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Boulders" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "sector" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "ascensions" INTEGER NOT NULL
);
INSERT INTO "new_Boulders" ("ascensions", "city", "difficulty", "id", "name", "sector") SELECT "ascensions", "city", "difficulty", "id", "name", "sector" FROM "Boulders";
DROP TABLE "Boulders";
ALTER TABLE "new_Boulders" RENAME TO "Boulders";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
