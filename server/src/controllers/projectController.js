import Project from '../models/Project.js';
import Task from '../models/Task.js';
import { HttpError } from '../utils/HttpError.js';

/**
 * Lists projects with optional status filter and computed task counts.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function listProjects(req, res) {
  const filter = {};
  if (req.validatedQuery?.status) {
    filter.status = req.validatedQuery.status;
  }
  const projects = await Project.find(filter).sort({ deadline: 1 });
  const counts = await Task.aggregate([
    { $match: { project: { $in: projects.map((p) => p._id) } } },
    {
      $group: {
        _id: '$project',
        taskCount: { $sum: 1 },
        completedTaskCount: {
          $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] },
        },
      },
    },
  ]);
  const byId = new Map(counts.map((c) => [c._id.toString(), c]));
  res.json(
    projects.map((p) => ({
      ...p.toJSON(),
      taskCount: byId.get(p.id)?.taskCount ?? 0,
      completedTaskCount: byId.get(p.id)?.completedTaskCount ?? 0,
    })),
  );
}

/**
 * Retrieves a single project by id with computed task counts.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getProject(req, res) {
  const project = await Project.findById(req.params.id);
  if (!project) {
    throw new HttpError(404, 'Project not found');
  }
  const counts = await Task.aggregate([
    { $match: { project: project._id } },
    {
      $group: {
        _id: '$project',
        taskCount: { $sum: 1 },
        completedTaskCount: {
          $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] },
        },
      },
    },
  ]);
  const stats = counts[0] || { taskCount: 0, completedTaskCount: 0 };
  res.json({
    ...project.toJSON(),
    taskCount: stats.taskCount,
    completedTaskCount: stats.completedTaskCount,
  });
}

/**
 * Creates a new project.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createProject(req, res) {
  const { title, description, status, deadline } = req.body;
  const project = await Project.create({
    title,
    description,
    status,
    deadline: new Date(`${deadline}T00:00:00.000Z`),
  });
  res.status(201).json(project.toJSON());
}

/**
 * Updates an existing project by id.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function updateProject(req, res) {
  const updateData = { ...req.body };
  if (updateData.deadline) {
    updateData.deadline = new Date(`${updateData.deadline}T00:00:00.000Z`);
  }
  const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    throw new HttpError(404, 'Project not found');
  }
  res.json(project.toJSON());
}

/**
 * Deletes a project and all associated tasks (cascade delete).
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function deleteProject(req, res) {
  const project = await Project.findById(req.params.id);
  if (!project) {
    throw new HttpError(404, 'Project not found');
  }
  await Task.deleteMany({ project: req.params.id });
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).send();
}

/**
 * Lists tasks for a specific project.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function listTasksForProject(req, res) {
  const project = await Project.findById(req.params.projectId);
  if (!project) {
    throw new HttpError(404, 'Project not found');
  }
  const filter = { project: req.params.projectId };
  if (req.validatedQuery?.status) {
    filter.status = req.validatedQuery.status;
  }
  const tasks = await Task.find(filter).sort({ createdAt: 1 });
  // Sorting: not Completed first, then createdAt asc
  tasks.sort((a, b) => {
    const aComp = a.status === 'Completed' ? 1 : 0;
    const bComp = b.status === 'Completed' ? 1 : 0;
    return aComp - bComp;
  });
  res.json(tasks.map((t) => t.toJSON()));
}

/**
 * Creates a new task for a specific project.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createTaskForProject(req, res) {
  const project = await Project.findById(req.params.projectId);
  if (!project) {
    throw new HttpError(404, 'Project not found');
  }
  const task = await Task.create({
    project: req.params.projectId,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  });
  res.status(201).json(task.toJSON());
}
