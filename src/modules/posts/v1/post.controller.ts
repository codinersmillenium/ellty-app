import { Controller, Post, Body, Get, UseGuards, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../shared/auth/jwt-auth.guard'; 
import { PostService } from '../post.service';
import { CreatePostDto } from './dto/create-post.dto';
import type { RequestWithUser } from '../../../shared/interface/request.interface';

@ApiTags('posts (v1)')
@Controller({
  path: 'posts',
  version: '1',
})
export class PostControllerV1 {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 201, description: 'Post (Starting Number) successfully created.' })
  async create(@Req() req: RequestWithUser, @Body() dto: CreatePostDto) {
    const authorId = req.user.id;
    const post = await this.postService.createPost(authorId, dto); 
    
    return { 
      data: post, 
      message: 'Post (Starting Number) created successfully' 
    }; 
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'List of all Posts and their operations.' })
  async findAll() {
    const posts = await this.postService.getAllPosts();
    return { 
      data: posts, 
      message: 'Posts retrieved successfully' 
    };
  }
}