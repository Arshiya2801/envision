/**
 * 404 handler for unmatched routes.
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 */
export const notFound = (_req, res) =>
  res.status(404).json({ error: { message: 'Route not found' } });
