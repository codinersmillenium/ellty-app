// src/modules/operations/operation.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OperationRepository } from './operation.repository';
import { OperationService } from './operation.service';
import { OperationControllerV1 } from './v1/operation.controller';
import { PostModule } from '../posts/post.module';

@Module({
  imports: [
    PrismaModule,
    PostModule
  ],
  providers: [OperationService, OperationRepository],
  controllers: [OperationControllerV1],
  exports: [OperationService],
})
export class OperationModule {}
