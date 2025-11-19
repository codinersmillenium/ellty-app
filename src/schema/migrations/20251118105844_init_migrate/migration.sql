-- CreateEnum
CREATE TYPE "node"."OperationType" AS ENUM ('ADD', 'SUB', 'MUL', 'DIV');

-- CreateTable
CREATE TABLE "node"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "node"."Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "starting_numb" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "node"."Operation" (
    "id" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,
    "parent_id" TEXT,
    "author_id" INTEGER NOT NULL,
    "type" "node"."OperationType" NOT NULL,
    "right_operand" INTEGER NOT NULL,
    "result" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "node"."User"("username");

-- AddForeignKey
ALTER TABLE "node"."Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "node"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "node"."Operation" ADD CONSTRAINT "Operation_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "node"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "node"."Operation" ADD CONSTRAINT "Operation_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "node"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
