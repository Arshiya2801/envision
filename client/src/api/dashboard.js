import { api } from './client.js';

/**
 * Fetches dashboard summary statistics.
 * @returns {Promise<object>}
 */
export const getDashboardSummary = () => api.get('/dashboard/summary').then((r) => r.data);
