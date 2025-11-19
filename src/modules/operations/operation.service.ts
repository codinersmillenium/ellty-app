// src/modules/operations/operation.service.ts
import { Injectable } from '@nestjs/common';
import { OperationRepository } from './operation.repository';
import { PostRepository } from '../posts/post.repository';
import { OperationDataDto } from './v1/dto/operation-data.dto';
import { Operation, OperationType } from '@prisma/client';

@Injectable()
export class OperationService {
  constructor(
    private readonly repository: OperationRepository,
    private readonly postRepository: PostRepository
  ) {}

  computeResult(type: OperationType, right_operand: number, left: number): number {
    switch (type) {
      case 'ADD':
        return left + right_operand;
      case 'SUB':
        return left - right_operand;
      case 'MUL':
        return left * right_operand;
      case 'DIV':
        return Math.floor(left / right_operand);
    }
  }

  async createOperation(dto: OperationDataDto): Promise<Operation> {
    const post = await this.postRepository.findById(dto.post_id);
    if (!post) {
      throw new Error('Post not found.'); 
    }
    let leftOperand: number;
    if (dto.parent_id) {
        const parentOperation = await this.repository.findById(dto.parent_id);
        if (!parentOperation) {
            throw new Error('Parent operation not found.');
        }
        leftOperand = parentOperation.result;
    } else {
        leftOperand = post.starting_numb; 
    }
    const result = this.computeResult(dto.type, dto.right_operand, leftOperand);
    return this.repository.create({
      ...dto,
      result,
    });
  }

  async listByPost(postId: number): Promise<Operation[]> {
    return this.repository.findByPostId(postId);
  }
}