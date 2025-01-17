export type Segment = {
  id: number;
  name: string;
  description: string;
  conditions: string; // JSON string containing segment conditions
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  user_id: number; // Foreign key to User
};

// Optional: Interface for creating a new segment (without id and timestamps)
export interface CreateSegmentInput {
  name: string;
  description: string;
  conditions: string;
  is_active: boolean;
  user_id: number;
}

// Optional: Interface for updating an existing segment
export interface UpdateSegmentInput {
  name?: string;
  description?: string;
  conditions?: string;
  is_active?: boolean;
}