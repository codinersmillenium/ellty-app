// src/modules/users/user.types.ts
import { Prisma } from '@prisma/client';

export const generalSelect = { 
  id: true, 
  username: true, 
  createdAt: true
} as const;

export const authSelect = {
  id: true,
  username: true,
  password: true
} as const;

export type GeneralUserResult = Prisma.UserGetPayload<{ select: typeof generalSelect }>; 
export type AuthUserResult = Prisma.UserGetPayload<{ select: typeof authSelect }>;