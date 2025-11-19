// src/modules/users/users.service.ts
import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserDto } from './v1/dto/user.dto';
import { UserRepository } from './user.repository';
import { GeneralUserResult, AuthUserResult } from './user.type'; 

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository, 
    private readonly jwtService: JwtService,
  ) {}

  // register user
  async register(payload: UserDto): Promise<GeneralUserResult> {
    const exists = await this.userRepository.findUser(payload.username); 
    if (exists) {
      throw new ConflictException('Username already registered');
    }
    const userResult = await this.userRepository.create(payload);
    return userResult;
  }

  async findAll(): Promise<GeneralUserResult[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<GeneralUserResult> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  } 

  async login(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.validateUser(username, password); 
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id }; 
    
    return { access_token: this.jwtService.sign(payload) };
  }

  // validate user (private)
  private async validateUser(username: string, pass: string): Promise<Omit<AuthUserResult, 'password'> | null> {
    const authResult = await this.userRepository.findUser(username); 
    
    if (!authResult) return null;
    const match = await bcrypt.compare(pass, authResult.password); 
    if (!match) return null;

    const { password, ...safe } = authResult; 
    return safe; 
  }
}