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
  weight: number | null;
  createdAt: string;
  updatedAt: string;
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
  startDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  userId: string;
  name: string;
  clothing: string;
  wheels: string;
  wind: string;
  weight: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
} 