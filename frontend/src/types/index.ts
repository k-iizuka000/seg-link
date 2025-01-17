// User type definition
export interface User {
  id: number;
  stravaUserId: number;
  weight: number | null;
  createdAt: Date;
  updatedAt: Date;
}

// Activity type definition
export interface Activity {
  id: number;
  stravaActivityId: number;
  userId: number;
  title: string;
  description: string | null;
  startDate: Date;
  distance: number;
  averagePower: number | null;
  elapsedTime: number;
  createdAt: Date;
  updatedAt: Date;
}

// Segment type definition
export interface Segment {
  id: number;
  stravaSegmentId: number;
  name: string;
  distance: number;
  createdAt: Date;
  updatedAt: Date;
}

// Template type definition
export interface Template {
  id: number;
  userId: number;
  name: string;
  templateJson: {
    clothing?: string;
    wheels?: string;
    weather?: string;
    weight?: number;
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Segment effort type definition
export interface SegmentEffort {
  id: number;
  activityId: number;
  segmentId: number;
  elapsedTime: number;
  averagePower: number | null;
  createdAt: Date;
  updatedAt: Date;
} 