import * as z from 'zod';

export const postSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(5, 'Title must be at least 5 characters long')
    .max(100, 'Title cannot exceed 100 characters'),
  body: z
    .string()
    .min(1, 'Body is required')
    .min(10, 'Body must be at least 10 characters long')
    .max(1000, 'Body cannot exceed 1000 characters'),
});

export type PostFormData = z.infer<typeof postSchema>;
