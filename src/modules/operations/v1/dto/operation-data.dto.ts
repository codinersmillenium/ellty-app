
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OperationType } from '@prisma/client';

export class OperationDataDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  post_id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  parent_id?: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  author_id: number; 

  @ApiProperty({ enum: OperationType })
  @IsEnum(OperationType)
  @IsNotEmpty()
  type: OperationType;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  right_operand: number;
  
  @ApiProperty()
  @IsInt()
  @IsOptional()
  result?: number; 
}