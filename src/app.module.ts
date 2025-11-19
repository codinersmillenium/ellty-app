// src/app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config'; 

import { databaseConfig } from './config/database.config';         
import { jwtConfig } from './config/jwt.config';
import { webHookConfig } from './config/vendor.config';

import { UserModule } from './modules/users/user.module';           
import { PostModule } from './modules/posts/post.module'; 
import { OperationModule } from './modules/operations/operation.module';      

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        jwtConfig,
        databaseConfig,
        webHookConfig
      ]
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: Number(process.env.THROTTLE_TTL) || 60000, 
          limit: Number(process.env.THROTTLE_LIMIT) || 100,
        },
      ],
    }),
    
    UserModule,
    PostModule,
    OperationModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard }
  ],
})
export class AppModule {}