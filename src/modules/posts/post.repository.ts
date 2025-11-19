// src/modules/posts/v1/post.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';

const generalSelect = {
  select: {
    id: true,
    title: true,
    starting_numb: true,
    author_id: true,
    createdAt: true,
    author: {
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    },
    operation: true,
  },
};

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(authorId: number, dto: { title?: string; starting_numb: number }): Promise<Post | null> {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        starting_numb: dto.starting_numb,
        author_id: authorId,
      },
      ...generalSelect,
    });
  }

  async findById(id: number): Promise<Post> {
    return this.prisma.post.findUniqueOrThrow({ 
      where: { id },
      ...generalSelect, 
    });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      ...generalSelect,
      orderBy: { createdAt: 'desc' },
    });
  }
}
