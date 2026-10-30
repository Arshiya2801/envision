import Project from '../models/Project.js';
import Task from '../models/Task.js';

/**
 * Returns dashboard aggregate metrics.
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 */
export async function getDashboardSummary(_req, res) {
  const [
    totalProjects,
    activeProjects,
    completedProjects,
    onHoldProjects,
    totalTasks,
    completedTasks,
    inProgressTasks,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ status: 'Active' }),
    Project.countDocuments({ status: 'Completed' }),
    Project.countDocuments({ status: 'On Hold' }),
    Task.countDocuments(),
    Task.countDocuments({ status: 'Completed' }),
    Task.countDocuments({ status: 'In Progress' }),
  ]);

  res.json({
    totalProjects,
    activeProjects,
    completedProjects,
    onHoldProjects,
    totalTasks,
    completedTasks,
    inProgressTasks,
    pendingTasks: totalTasks - completedTasks,
  });
}
