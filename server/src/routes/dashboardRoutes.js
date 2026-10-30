import { Router } from 'express';
import { getDashboardSummary } from '../controllers/dashboardController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.get('/summary', asyncHandler(getDashboardSummary));

export default router;
