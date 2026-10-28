import { ZodError } from 'zod';
import mongoose from 'mongoose';

/**
 * Global error handling middleware.
 * @param {any} err
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 */
export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        message: 'Validation failed',
        details: err.issues.map((i) => ({ field: i.path.join('.') || 'body', message: i.message })),
      },
    });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      error: {
        message: 'Validation failed',
        details: Object.values(err.errors).map((e) => ({ field: e.path, message: e.message })),
      },
    });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: { message: 'Invalid id' } });
  }
  if (err.status) {
    return res.status(err.status).json({ error: { message: err.message } });
  }
  // eslint-disable-next-line no-console
  console.error(err);
  const message = process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message;
  return res.status(500).json({ error: { message } });
}
