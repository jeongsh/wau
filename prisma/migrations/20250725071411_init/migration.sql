-- CreateTable
CREATE TABLE `Contact` (
    `no` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `content` TEXT NOT NULL,
    `type` VARCHAR(50) NOT NULL DEFAULT 'general',
    `userName` VARCHAR(50) NOT NULL,
    `userEmail` VARCHAR(100) NOT NULL,
    `phoneNumber` VARCHAR(20) NULL,
    `answer` TEXT NULL,
    `createdDt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedDt` DATETIME(3) NULL,
    `deletedYn` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faq` (
    `no` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL DEFAULT '',
    `content` TEXT NOT NULL,
    `pick` BOOLEAN NOT NULL DEFAULT false,
    `type` VARCHAR(50) NOT NULL DEFAULT '',
    `createdDt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedDt` DATETIME(3) NULL,
    `deletedYn` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notice` (
    `no` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL DEFAULT '',
    `content` TEXT NOT NULL DEFAULT '',
    `pick` BOOLEAN NOT NULL DEFAULT false,
    `createdDt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDt` DATETIME(3) NOT NULL,
    `deletedDt` DATETIME(3) NULL,
    `deletedYn` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `no` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(100) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phoneNumber` VARCHAR(20) NOT NULL,
    `password` VARCHAR(255) NOT NULL DEFAULT '1234',
    `name` VARCHAR(50) NOT NULL DEFAULT '',
    `nickname` VARCHAR(50) NOT NULL DEFAULT '',
    `createdDt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDt` DATETIME(3) NOT NULL,
    `modifiedDt` DATETIME(3) NULL,
    `deletedDt` DATETIME(3) NULL,
    `deletedYn` BOOLEAN NOT NULL DEFAULT false,
    `role` ENUM('ADMIN', 'USER', 'GUEST') NOT NULL DEFAULT 'USER',
    `extra01` VARCHAR(255) NULL DEFAULT '',

    UNIQUE INDEX `User_uuid_key`(`uuid`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
