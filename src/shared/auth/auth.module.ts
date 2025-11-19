// src/shared/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService): JwtModuleOptions => ({
            secret: configService.get<string>('jwt.secret') as string,
            signOptions: { 
                expiresIn: 3600
            },
        }),
        inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtModule, JwtAuthGuard], 
})

export class SharedAuthModule {}