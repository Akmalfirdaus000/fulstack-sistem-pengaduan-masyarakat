// src/types/jwt.d.ts
export interface JwtPayload {
    id: number;
    username: string;
    role: 'user' | 'admin';
  }
  