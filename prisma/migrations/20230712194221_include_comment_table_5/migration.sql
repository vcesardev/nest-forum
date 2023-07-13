/*
  Warnings:

  - You are about to drop the column `userId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `post` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_userId_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `userId`,
    ADD COLUMN `authorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `userId`,
    ADD COLUMN `authorId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Post_userId_fkey` ON `post`(`authorId`);

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `Comment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
