export interface Template {
  id: number;
  name: string;
  description?: string;
  content: string;
  type: TemplateType;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  userId: number; // Reference to the creator/owner
}

// Enum for template types
export enum TemplateType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  IN_APP = 'IN_APP'
}