import { Router } from 'express';
import {
  listProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  listTasksForProject,
  createTaskForProject,
} from '../controllers/projectController.js';
import { validate } from '../middleware/validate.js';
import { validateObjectId } from '../middleware/validateObjectId.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import {
  listQuerySchema,
  createProjectSchema,
  updateProjectSchema,
} from '../validators/project.js';
import { taskQuerySchema, createTaskSchema } from '../validators/task.js';

const router = Router();

router.get('/', validate(listQuerySchema, 'query'), asyncHandler(listProjects));
router.post('/', validate(createProjectSchema), asyncHandler(createProject));
router.get('/:id', validateObjectId('id'), asyncHandler(getProject));
router.put(
  '/:id',
  validateObjectId('id'),
  validate(updateProjectSchema),
  asyncHandler(updateProject),
);
router.delete('/:id', validateObjectId('id'), asyncHandler(deleteProject));

router.get(
  '/:projectId/tasks',
  validateObjectId('projectId'),
  validate(taskQuerySchema, 'query'),
  asyncHandler(listTasksForProject),
);
router.post(
  '/:projectId/tasks',
  validateObjectId('projectId'),
  validate(createTaskSchema),
  asyncHandler(createTaskForProject),
);

export default router;
