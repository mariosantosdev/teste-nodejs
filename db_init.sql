-- CreateTable
CREATE TABLE `Business` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` VARCHAR(191) NOT NULL,
    `razao_social` VARCHAR(191) NOT NULL,
    `nome_fantasia` VARCHAR(191) NOT NULL,
    `atividade_principal` VARCHAR(191) NOT NULL,
    `data_de_abertura` VARCHAR(191) NOT NULL,
    `natureza_juridica` VARCHAR(191) NOT NULL,
    `enderecoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Business_cnpj_key`(`cnpj`),
    UNIQUE INDEX `Business_enderecoId_key`(`enderecoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(191) NOT NULL,
    `codigo_do_ibge` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Business` ADD CONSTRAINT `Business_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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