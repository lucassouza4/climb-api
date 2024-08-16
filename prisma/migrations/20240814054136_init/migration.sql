/*
  Warnings:

  - The primary key for the `Boulders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Boulders` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Boulders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "sector" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "ascents" INTEGER NOT NULL
);
INSERT INTO "new_Boulders" ("ascents", "city", "difficulty", "id", "key", "name", "sector") SELECT "ascents", "city", "difficulty", "id", "key", "name", "sector" FROM "Boulders";
DROP TABLE "Boulders";
ALTER TABLE "new_Boulders" RENAME TO "Boulders";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
