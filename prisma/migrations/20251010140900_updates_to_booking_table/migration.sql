/*
  Warnings:

  - You are about to drop the column `preferences` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `bookingType` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cancellationPolicy` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depositAcknowledged` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passengers` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "preferences",
ADD COLUMN     "additionalNotes" TEXT,
ADD COLUMN     "additionalStops" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "additionalStopsInfo" TEXT,
ADD COLUMN     "bookingType" TEXT NOT NULL,
ADD COLUMN     "cancellationPolicy" BOOLEAN NOT NULL,
ADD COLUMN     "depositAcknowledged" BOOLEAN NOT NULL,
ADD COLUMN     "luggage" TEXT,
ADD COLUMN     "passengers" INTEGER NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "paymentScreenshot" TEXT,
ADD COLUMN     "returnDate" TEXT,
ADD COLUMN     "returnTime" TEXT;
