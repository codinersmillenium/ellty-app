// src/modules/posts/post.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostControllerV1 } from './v1/post.controller';

@Module({
  imports: [PrismaModule],
  providers: [PostService, PostRepository],
  controllers: [PostControllerV1],
  exports: [PostService, PostRepository],
})
export class PostModule {}