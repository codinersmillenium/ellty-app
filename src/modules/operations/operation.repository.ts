// src/modules/operations/operation.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Operation } from '@prisma/client';

const generalSelect = {
  select: {
    id: true,
    post_id: true,
    parent_id: true,
    author_id: true,
    type: true,
    right_operand: true,
    result: true,
    createdAt: true,
  },
};

@Injectable()
export class OperationRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    post_id: number;
    parent_id?: string;
    author_id: number;
    type: | 'ADD' | 'SUB' | 'MUL' | 'DIV';
    right_operand: number;
    result: number;
  }): Promise<Operation> {
    return this.prisma.operation.create({
      data,
      ...generalSelect,
    });
  }

  async findById(id: string): Promise<Operation> {
    return this.prisma.operation.findUniqueOrThrow({
      where: { id },
      ...generalSelect,
    });
  }

  async findByPostId(post_id: number): Promise<Operation[]> {
    return this.prisma.operation.findMany({
      where: { post_id },
      ...generalSelect,
    });
  }
}