// src/modules/users/users.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../shared/auth/jwt-auth.guard';
import { UserService } from '../user.service';
import { UserDto } from './dto/user.dto';

@ApiTags('users (v1)')
@Controller({
  path: 'users',
  version: '1',
})
export class UserControllerV1 {
  constructor(private readonly UserService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  async register(@Body() dto: UserDto) {
    const user = await this.UserService.register(dto); 
    return { data: user, message: 'User registered successfully' }; 
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Login successful, returns JWT token.' })
  async login(@Body() dto: UserDto) {
    return this.UserService.login(dto.username, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getAll() {
    return this.UserService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.UserService.findOne(id);
  }
}