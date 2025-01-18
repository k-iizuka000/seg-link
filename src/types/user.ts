export interface User {
  id: number;
  stravaId: string;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiresAt: Date;
  weight?: number;
  createdAt: Date;
  updatedAt: Date;
} 