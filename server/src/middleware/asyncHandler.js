/**
 * Wraps an async Express route handler to forward unhandled errors to next().
 * @param {Function} fn - Async express middleware function
 * @returns {Function} Express middleware function
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
