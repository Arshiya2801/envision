/**
 * Middleware factory that validates req[where] against a Zod schema.
 * @param {import('zod').ZodSchema} schema - Zod validation schema
 * @param {'body' | 'query'} where - Target request property to validate
 * @returns {Function} Express middleware function
 */
export const validate =
  (schema, where = 'body') =>
  (req, _res, next) => {
    const result = schema.safeParse(req[where]);
    if (!result.success) return next(result.error);
    req[where === 'query' ? 'validatedQuery' : 'body'] = result.data;
    next();
  };
