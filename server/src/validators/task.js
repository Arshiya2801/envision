import { z } from 'zod';
import { TASK_STATUSES } from '../constants.js';

export const taskQuerySchema = z.object({
  status: z
    .enum(TASK_STATUSES, {
      errorMap: () => ({ message: 'Status must be Pending, In Progress or Completed' }),
    })
    .optional(),
});

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  description: z
    .string()
    .trim()
    .max(1000, 'Description must be at most 1000 characters')
    .optional(),
  status: z
    .enum(TASK_STATUSES, {
      errorMap: () => ({ message: 'Status must be Pending, In Progress or Completed' }),
    })
    .default('Pending'),
});

export const updateTaskSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title must be at most 100 characters')
      .optional(),
    description: z
      .string()
      .trim()
      .max(1000, 'Description must be at most 1000 characters')
      .optional(),
    status: z
      .enum(TASK_STATUSES, {
        errorMap: () => ({ message: 'Status must be Pending, In Progress or Completed' }),
      })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, { message: 'Send at least one field to update' });
