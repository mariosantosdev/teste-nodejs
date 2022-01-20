/*
  Warnings:

  - A unique constraint covering the columns `[rawCnpj]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rawCnpj` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Business` DROP FOREIGN KEY `Business_enderecoId_fkey`;

-- DropIndex
DROP INDEX `Business_cnpj_key` ON `Business`;

-- AlterTable
ALTER TABLE `Business` ADD COLUMN `rawCnpj` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Business_rawCnpj_key` ON `Business`(`rawCnpj`);

-- AddForeignKey
ALTER TABLE `Business` ADD CONSTRAINT `Business_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
