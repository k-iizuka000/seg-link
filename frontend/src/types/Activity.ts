export type User = {
  id: string;
  name: string;
  email: string;
};

export type Segment = {
  id: string;
  name: string;
  description: string;
};

export type Template = {
  id: string;
  title: string;
  content: string;
};

export interface Activity {
  id: string;
  type: 'create' | 'update' | 'delete';
  timestamp: string;
  user?: User;
  segment?: Segment;
  template?: Template;
  metadata?: Record<string, any>;
}