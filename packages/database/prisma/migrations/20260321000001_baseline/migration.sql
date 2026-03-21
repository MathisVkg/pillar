-- CreateTable
CREATE TABLE `admin` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `vatNumber` VARCHAR(191) NULL,
    `address` TEXT NULL,
    `city` VARCHAR(191) NULL,
    `language` VARCHAR(191) NOT NULL DEFAULT 'fr',
    `contractType` VARCHAR(191) NOT NULL DEFAULT 'adhoc',
    `retainerHours` INTEGER NULL,
    `retainerFee` DECIMAL(10, 2) NULL,
    `hourlyRate` DECIMAL(10, 2) NOT NULL DEFAULT 95.00,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `client_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client_user` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'viewer',
    `portalToken` VARCHAR(191) NOT NULL,
    `tokenExpiresAt` DATETIME(3) NULL,
    `lastLoginAt` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `client_user_email_key`(`email`),
    UNIQUE INDEX `client_user_portalToken_key`(`portalToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `visitId` VARCHAR(191) NULL,
    `reference` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'open',
    `priority` VARCHAR(191) NOT NULL DEFAULT 'normal',
    `source` VARCHAR(191) NOT NULL DEFAULT 'manual',
    `sourceRef` VARCHAR(191) NULL,
    `isBillable` BOOLEAN NOT NULL DEFAULT true,
    `resolvedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ticket_reference_key`(`reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_entry` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(191) NULL,
    `invoiceId` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `durationMinutes` INTEGER NOT NULL,
    `hourlyRate` DECIMAL(10, 2) NOT NULL,
    `isBillable` BOOLEAN NOT NULL DEFAULT true,
    `isInvoiced` BOOLEAN NOT NULL DEFAULT false,
    `loggedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    `periodStart` DATE NOT NULL,
    `periodEnd` DATE NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `vatRate` DECIMAL(4, 2) NOT NULL DEFAULT 0.21,
    `vatAmount` DECIMAL(10, 2) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `dueDate` DATE NOT NULL,
    `paidAt` DATETIME(3) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `invoice_number_key`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asset` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `serialNumber` VARCHAR(191) NULL,
    `assignedTo` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ok',
    `sensitivity` VARCHAR(191) NOT NULL DEFAULT 'normal',
    `showSerialInPortal` BOOLEAN NOT NULL DEFAULT false,
    `notes` TEXT NULL,
    `warrantyExpiresAt` DATE NULL,
    `purchasedAt` DATE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contract` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `vendor` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `renewalDate` DATE NOT NULL,
    `costPerYear` DECIMAL(10, 2) NULL,
    `autoRenews` BOOLEAN NOT NULL DEFAULT false,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visit` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'adhoc',
    `status` VARCHAR(191) NOT NULL DEFAULT 'in_progress',
    `notes` TEXT NULL,
    `visitedAt` DATETIME(3) NOT NULL,
    `completedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklist_item` (
    `id` VARCHAR(191) NOT NULL,
    `visitId` VARCHAR(191) NOT NULL,
    `templateItemId` VARCHAR(191) NULL,
    `label` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `resultNote` VARCHAR(191) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklist_template` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklist_template_item` (
    `id` VARCHAR(191) NOT NULL,
    `templateId` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `instruction` VARCHAR(191) NULL,
    `section` VARCHAR(191) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expense` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NULL,
    `vendor` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `amountExcl` DECIMAL(10, 2) NOT NULL,
    `vatAmount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `category` VARCHAR(191) NOT NULL,
    `expenseDate` DATE NOT NULL,
    `receiptUrl` VARCHAR(191) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `external_income` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NULL,
    `source` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `amountExcl` DECIMAL(10, 2) NOT NULL,
    `vatAmount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `receivedAt` DATE NOT NULL,
    `documentUrl` VARCHAR(191) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `income_entry` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NULL,
    `sourceType` VARCHAR(191) NOT NULL,
    `sourceId` VARCHAR(191) NOT NULL,
    `amountExcl` DECIMAL(10, 2) NOT NULL,
    `vatAmount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `receivedAt` DATETIME(3) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `client_user` ADD CONSTRAINT `client_user_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticket` ADD CONSTRAINT `ticket_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticket` ADD CONSTRAINT `ticket_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `visit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_entry` ADD CONSTRAINT `time_entry_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_entry` ADD CONSTRAINT `time_entry_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `ticket`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_entry` ADD CONSTRAINT `time_entry_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `asset_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contract` ADD CONSTRAINT `contract_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visit` ADD CONSTRAINT `visit_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_item` ADD CONSTRAINT `checklist_item_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `visit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_item` ADD CONSTRAINT `checklist_item_templateItemId_fkey` FOREIGN KEY (`templateItemId`) REFERENCES `checklist_template_item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_template` ADD CONSTRAINT `checklist_template_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_template_item` ADD CONSTRAINT `checklist_template_item_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `checklist_template`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `external_income` ADD CONSTRAINT `external_income_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income_entry` ADD CONSTRAINT `income_entry_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

