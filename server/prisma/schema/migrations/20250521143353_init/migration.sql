/*
  Warnings:

  - You are about to drop the `allowance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deduction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `modules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role_permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_allowance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_basic_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_deduction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_educational_background` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_employment_background` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_employment_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."permissions" DROP CONSTRAINT "permissions_module_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."role_permission" DROP CONSTRAINT "role_permission_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."role_permission" DROP CONSTRAINT "role_permission_role_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_allowance" DROP CONSTRAINT "user_allowance_allowance_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_allowance" DROP CONSTRAINT "user_allowance_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_basic_info" DROP CONSTRAINT "user_basic_info_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_deduction" DROP CONSTRAINT "user_deduction_deduction_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_deduction" DROP CONSTRAINT "user_deduction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_educational_background" DROP CONSTRAINT "user_educational_background_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_employment_background" DROP CONSTRAINT "user_employment_background_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_employee_status_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_position_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_role_id_fkey";

-- DropTable
DROP TABLE "public"."allowance";

-- DropTable
DROP TABLE "public"."deduction";

-- DropTable
DROP TABLE "public"."employee_status";

-- DropTable
DROP TABLE "public"."modules";

-- DropTable
DROP TABLE "public"."permissions";

-- DropTable
DROP TABLE "public"."position";

-- DropTable
DROP TABLE "public"."project_status";

-- DropTable
DROP TABLE "public"."role_permission";

-- DropTable
DROP TABLE "public"."roles";

-- DropTable
DROP TABLE "public"."task";

-- DropTable
DROP TABLE "public"."user_allowance";

-- DropTable
DROP TABLE "public"."user_basic_info";

-- DropTable
DROP TABLE "public"."user_deduction";

-- DropTable
DROP TABLE "public"."user_educational_background";

-- DropTable
DROP TABLE "public"."user_employment_background";

-- DropTable
DROP TABLE "public"."user_employment_info";

-- DropTable
DROP TABLE "public"."users";

-- CreateTable
CREATE TABLE "allowance" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "allowance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deduction" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "position" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "link" VARCHAR(120) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "module_id" INTEGER NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "description" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permission" (
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "role_permission_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "user_basic_info" (
    "user_id" INTEGER NOT NULL,
    "first_name" VARCHAR(60) NOT NULL,
    "last_name" VARCHAR(60) NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "mobile_number" VARCHAR(11) NOT NULL,
    "marital_status" VARCHAR(10) NOT NULL,
    "gender" VARCHAR(6) NOT NULL,
    "nationality" VARCHAR(60) NOT NULL,
    "province_code" VARCHAR(5) NOT NULL,
    "city_code" VARCHAR(7) NOT NULL,
    "brangay_code" VARCHAR(10) NOT NULL,
    "address" VARCHAR(120) NOT NULL
);

-- CreateTable
CREATE TABLE "user_employment_background" (
    "user_id" INTEGER NOT NULL,
    "company" VARCHAR(120) NOT NULL,
    "position" VARCHAR(120) NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "user_educational_background" (
    "user_id" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "user_employment_info" (
    "user_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "salary" DECIMAL(65,30) NOT NULL,
    "date_regularization" TIMESTAMP(3) NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "position_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "employee_status_id" INTEGER NOT NULL,
    "allowance_id" INTEGER NOT NULL,
    "deduction_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "password" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_allowance" (
    "user_id" INTEGER NOT NULL,
    "allowance_id" INTEGER NOT NULL,

    CONSTRAINT "user_allowance_pkey" PRIMARY KEY ("user_id","allowance_id")
);

-- CreateTable
CREATE TABLE "user_deduction" (
    "user_id" INTEGER NOT NULL,
    "deduction_id" INTEGER NOT NULL,

    CONSTRAINT "user_deduction_pkey" PRIMARY KEY ("user_id","deduction_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "allowance_name_key" ON "allowance"("name");

-- CreateIndex
CREATE UNIQUE INDEX "deduction_name_key" ON "deduction"("name");

-- CreateIndex
CREATE UNIQUE INDEX "employee_status_name_key" ON "employee_status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "project_status_name_key" ON "project_status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "position_name_key" ON "position"("name");

-- CreateIndex
CREATE UNIQUE INDEX "task_name_key" ON "task"("name");

-- CreateIndex
CREATE UNIQUE INDEX "modules_name_key" ON "modules"("name");

-- CreateIndex
CREATE UNIQUE INDEX "modules_link_key" ON "modules"("link");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_basic_info_user_id_key" ON "user_basic_info"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_basic_info_email_key" ON "user_basic_info"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_basic_info_mobile_number_key" ON "user_basic_info"("mobile_number");

-- CreateIndex
CREATE UNIQUE INDEX "user_employment_background_user_id_key" ON "user_employment_background"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_educational_background_user_id_key" ON "user_educational_background"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_employment_info_user_id_key" ON "user_employment_info"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_employment_info_employee_id_key" ON "user_employment_info"("employee_id");

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_basic_info" ADD CONSTRAINT "user_basic_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_employment_background" ADD CONSTRAINT "user_employment_background_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_educational_background" ADD CONSTRAINT "user_educational_background_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_employee_status_id_fkey" FOREIGN KEY ("employee_status_id") REFERENCES "employee_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_allowance" ADD CONSTRAINT "user_allowance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_allowance" ADD CONSTRAINT "user_allowance_allowance_id_fkey" FOREIGN KEY ("allowance_id") REFERENCES "allowance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_deduction" ADD CONSTRAINT "user_deduction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_deduction" ADD CONSTRAINT "user_deduction_deduction_id_fkey" FOREIGN KEY ("deduction_id") REFERENCES "deduction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
