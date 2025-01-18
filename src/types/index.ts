export interface ActivitySyncJob {
  userId: number;
  type?: string;
  startDate?: string;
  endDate?: string;
}

export interface StravaActivity {
  id: number;
  name: string;
  type: string;
  start_date: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  average_speed: number;
  total_elevation_gain: number;
  start_latlng?: [number, number];
  end_latlng?: [number, number];
}

export interface User {
  id: number;
  stravaId: string;
  email: string | null;
  name: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiresAt: Date;
  weight?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Segment {
  id: string;
  name: string;
  distance: number;
  averageGrade: number;
  totalElevationGain: number;
  prTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface Effort {
  id: string;
  segmentId: string;
  startDate: string;
  movingTime: number;
  averageWatts: number | null;
  createdAt: string;
  updatedAt: string;
} 