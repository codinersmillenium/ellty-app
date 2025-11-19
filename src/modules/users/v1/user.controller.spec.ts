// src/modules/users/users.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

class UserService {
  register(dto: UserDto): Promise<UserDto> { return null as any; }
}

class UserController {
  constructor(private readonly UserService: UserService) {}
  async register(dto: UserDto) {
    const user = await this.UserService.register(dto); 
    return { data: user, message: 'User registered successfully' }; 
  }
}

const mockUserService = {
  register: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController as any], 
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // dummy
  const mockCreateUserDto: UserDto = {
    username: 'testing@example.com',
    password: 'testPassword123',
  };

  const mockRegisteredUser: UserDto = {
    username: 'new.user@example.com',
    password: 'testPassword123'
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    
    it('should successfully register a new user and return success message', async () => {
      mockUserService.register.mockResolvedValue(mockRegisteredUser);
      const result = await controller.register(mockCreateUserDto);
      expect(mockUserService.register).toHaveBeenCalledWith(mockCreateUserDto);
      
      expect(result).toEqual({ 
        data: mockRegisteredUser, 
        message: 'User registered successfully' 
      });
    });

    it('should throw BadRequestException if UserService fails (e.g., email already exists)', async () => {
      mockUserService.register.mockRejectedValue(
        new BadRequestException('User with this email already exists'),
      );

      await expect(controller.register(mockCreateUserDto)).rejects.toThrow(
        BadRequestException,
      );
      
      expect(mockUserService.register).toHaveBeenCalledTimes(1);
    });
  });
});