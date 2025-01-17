/*
  Warnings:

  - The values [aproved] on the enum `PurchaseStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[auth_user_id]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PurchaseStatus_new" AS ENUM ('pending', 'approved', 'failed');
ALTER TABLE "purchase" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "purchase" ALTER COLUMN "status" TYPE "PurchaseStatus_new" USING ("status"::text::"PurchaseStatus_new");
ALTER TYPE "PurchaseStatus" RENAME TO "PurchaseStatus_old";
ALTER TYPE "PurchaseStatus_new" RENAME TO "PurchaseStatus";
DROP TYPE "PurchaseStatus_old";
ALTER TABLE "purchase" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "auth_user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "customer_auth_user_id_key" ON "customer"("auth_user_id");
