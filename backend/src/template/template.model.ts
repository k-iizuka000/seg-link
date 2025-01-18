import { z } from 'zod';

export const TemplateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string().min(1),
  clothing: z.string(),
  wheels: z.string(),
  wind: z.string(),
  weight: z.number(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Template = z.infer<typeof TemplateSchema>; 