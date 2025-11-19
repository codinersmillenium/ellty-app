// src/modules/operations/v1/operation.controller.ts
import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../shared/auth/jwt-auth.guard';
import { OperationService } from '../operation.service';
import { ReqOperationDto } from './dto/req-operation.dto';
import { OperationDataDto } from './dto/operation-data.dto';
import type { RequestWithUser } from '../../../shared/interface/request.interface';

@ApiTags('operations (v1)')
@Controller({
  path: 'operations',
  version: '1',
})
export class OperationControllerV1 {
  constructor(private readonly operationService: OperationService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'Operation successfully created.',
  })
  async create(@Req() req: RequestWithUser, @Body() dto: ReqOperationDto) {
    const authorId = req.user.id;
    const body: OperationDataDto = {
        ...dto,
        author_id: authorId,
    };
    const op = await this.operationService.createOperation(body);
    return { data: op, message: 'Operation created successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('post/:postId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'List operations by post.',
  })
  async getByPost(@Param('postId') postId: string) {
    const ops = await this.operationService.listByPost(Number(postId));
    return { data: ops, message: 'Operations fetched successfully' };
  }
}