import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

/**
 * Creates and configures the Express application.
 * @returns {import('express').Express}
 */
export function createApp() {
  const app = express();
  const origins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim());
  app.use(cors({ origin: origins }));
  app.use(express.json({ limit: '100kb' }));
  if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
