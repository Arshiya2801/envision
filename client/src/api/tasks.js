import { api } from './client.js';

/**
 * Fetches tasks for a specific project.
 * @param {string} projectId
 * @param {string} [status]
 * @returns {Promise<Array<object>>}
 */
export const getTasksForProject = (projectId, status) =>
  api.get(`/projects/${projectId}/tasks`, { params: status ? { status } : {} }).then((r) => r.data);

/**
 * Creates a task for a project.
 * @param {string} projectId
 * @param {object} body
 * @returns {Promise<object>}
 */
export const createTask = (projectId, body) =>
  api.post(`/projects/${projectId}/tasks`, body).then((r) => r.data);

/**
 * Updates a task by id.
 * @param {string} id
 * @param {object} body
 * @returns {Promise<object>}
 */
export const updateTask = (id, body) => api.put(`/tasks/${id}`, body).then((r) => r.data);

/**
 * Deletes a task by id.
 * @param {string} id
 * @returns {Promise<void>}
 */
export const deleteTask = (id) => api.delete(`/tasks/${id}`).then((r) => r.data);
