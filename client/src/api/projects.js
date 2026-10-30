import { api } from './client.js';

/**
 * Fetches projects, optionally filtered by status.
 * @param {string} [status]
 * @returns {Promise<Array<object>>}
 */
export const getProjects = (status) =>
  api.get('/projects', { params: status ? { status } : {} }).then((r) => r.data);

/**
 * Fetches a single project by id.
 * @param {string} id
 * @returns {Promise<object>}
 */
export const getProject = (id) => api.get(`/projects/${id}`).then((r) => r.data);

/**
 * Creates a new project.
 * @param {object} body
 * @returns {Promise<object>}
 */
export const createProject = (body) => api.post('/projects', body).then((r) => r.data);

/**
 * Updates an existing project by id.
 * @param {string} id
 * @param {object} body
 * @returns {Promise<object>}
 */
export const updateProject = (id, body) => api.put(`/projects/${id}`, body).then((r) => r.data);

/**
 * Deletes a project by id.
 * @param {string} id
 * @returns {Promise<void>}
 */
export const deleteProject = (id) => api.delete(`/projects/${id}`).then((r) => r.data);
