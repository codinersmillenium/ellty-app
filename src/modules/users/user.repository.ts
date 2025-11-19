// src/modules/users/users.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { 
  generalSelect, 
  GeneralUserResult, 
  authSelect, 
  AuthUserResult 
} from './user.type'; 
import { UserDto } from './v1/dto/user.dto';


@Injectable()
export class UserRepository {  
  constructor(private readonly prisma: PrismaService) {} 

  // create user
  async create(payload: UserDto): Promise<GeneralUserResult> {
    const hashed = await bcrypt.hash(payload.password, 10);
    const userResult: GeneralUserResult = await this.prisma.user.create({
      data: { 
        username: payload.username, 
        password: hashed
      },
      select: generalSelect
    });
    
    return userResult;
}

  // find by id
  async findById(id: number): Promise<GeneralUserResult | null> {
    const rec: GeneralUserResult | null = await this.prisma.user.findUnique({
      where: { id },
      select: generalSelect
    });
    return rec; 
  }

  // find by email
  async findUser(username: string): Promise<AuthUserResult | null> {
    return this.prisma.user.findUnique({
      where: { username },
      select: authSelect,
    }) as Promise<AuthUserResult | null>;
  }

  // find all user
  async findAll(): Promise<GeneralUserResult[]> {
    const recs: GeneralUserResult[] = await this.prisma.user.findMany({
      select: generalSelect
    });
    return recs;
  }
}