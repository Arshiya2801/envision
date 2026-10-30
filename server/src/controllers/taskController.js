import Task from '../models/Task.js';
import { HttpError } from '../utils/HttpError.js';

/**
 * Retrieves a single task by id.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getTask(req, res) {
  const task = await Task.findById(req.params.id);
  if (!task) {
    throw new HttpError(404, 'Task not found');
  }
  res.json(task.toJSON());
}

/**
 * Updates a task by id.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function updateTask(req, res) {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    throw new HttpError(404, 'Task not found');
  }
  res.json(task.toJSON());
}

/**
 * Deletes a task by id.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function deleteTask(req, res) {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    throw new HttpError(404, 'Task not found');
  }
  res.status(204).send();
}
