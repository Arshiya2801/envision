import { z } from 'zod';
import { PROJECT_STATUSES } from '../constants.js';

export const listQuerySchema = z.object({
  status: z
    .enum(PROJECT_STATUSES, {
      errorMap: () => ({ message: 'Status must be Active, Completed or On Hold' }),
    })
    .optional(),
});

export const createProjectSchema = z.object({
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
    .enum(PROJECT_STATUSES, {
      errorMap: () => ({ message: 'Status must be Active, Completed or On Hold' }),
    })
    .default('Active'),
  deadline: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Deadline must be a valid date (YYYY-MM-DD)')
    .refine((val) => !isNaN(Date.parse(val)), 'Deadline must be a valid date (YYYY-MM-DD)'),
});

export const updateProjectSchema = z
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
      .enum(PROJECT_STATUSES, {
        errorMap: () => ({ message: 'Status must be Active, Completed or On Hold' }),
      })
      .optional(),
    deadline: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Deadline must be a valid date (YYYY-MM-DD)')
      .refine((val) => !isNaN(Date.parse(val)), 'Deadline must be a valid date (YYYY-MM-DD)')
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, { message: 'Send at least one field to update' });
