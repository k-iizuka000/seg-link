export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface User {
  id: string;
  stravaId: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  userId: string;
  stravaActivityId: string;
  name: string;
  distance: number;
  movingTime: number;
  elapsedTime: number;
  totalElevationGain: number;
  averageSpeed: number;
  maxSpeed: number;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
} 