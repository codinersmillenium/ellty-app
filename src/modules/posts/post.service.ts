// src/modules/posts/v1/post.service.ts
import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './v1/dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly repository: PostRepository) {}

  async createPost(userId: number, dto: CreatePostDto): Promise<Post | null> {
    return this.repository.create(userId, dto);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.repository.findAll();
  }
}