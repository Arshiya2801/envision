import mongoose from 'mongoose';
import { HttpError } from '../utils/HttpError.js';

/**
 * Middleware factory that validates if a route param is a valid MongoDB ObjectId.
 * @param {string} param - Route parameter name to validate
 * @returns {Function} Express middleware function
 */
export const validateObjectId = (param) => (req, _res, next) =>
  mongoose.isValidObjectId(req.params[param]) ? next() : next(new HttpError(400, 'Invalid id'));
