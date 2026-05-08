-- Add manual FinPilot extra tools:
-- - Road Book vehicle trip tracking
-- - Company Assets inventory tracking

CREATE TABLE `finpilot_road_book_entry` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NULL,
    `tripDate` DATE NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `vehicleName` VARCHAR(191) NOT NULL,
    `startLocation` VARCHAR(191) NOT NULL,
    `endLocation` VARCHAR(191) NOT NULL,
    `purpose` TEXT NULL,
    `odometerStart` INTEGER NULL,
    `odometerEnd` INTEGER NULL,
    `distanceKm` DECIMAL(10, 2) NOT NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `finpilot_road_book_entry_clientId_tripDate_idx`(`clientId`, `tripDate`),
    INDEX `finpilot_road_book_entry_clientId_type_idx`(`clientId`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `finpilot_company_asset` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `vendor` VARCHAR(191) NULL,
    `purchaseDate` DATE NOT NULL,
    `purchasePriceExcl` DECIMAL(10, 2) NOT NULL,
    `vatAmount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `serialNumber` VARCHAR(191) NULL,
    `warrantyUntil` DATE NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'active',
    `location` VARCHAR(191) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `finpilot_company_asset_clientId_status_idx`(`clientId`, `status`),
    INDEX `finpilot_company_asset_clientId_purchaseDate_idx`(`clientId`, `purchaseDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `finpilot_road_book_entry`
ADD CONSTRAINT `finpilot_road_book_entry_clientId_fkey`
FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `finpilot_company_asset`
ADD CONSTRAINT `finpilot_company_asset_clientId_fkey`
FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
