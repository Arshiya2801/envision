import { Router } from 'express';
import { getTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { validate } from '../middleware/validate.js';
import { validateObjectId } from '../middleware/validateObjectId.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { updateTaskSchema } from '../validators/task.js';

const router = Router();

router.get('/:id', validateObjectId('id'), asyncHandler(getTask));
router.put('/:id', validateObjectId('id'), validate(updateTaskSchema), asyncHandler(updateTask));
router.delete('/:id', validateObjectId('id'), asyncHandler(deleteTask));

export default router;
