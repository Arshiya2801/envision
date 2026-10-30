import { readFile } from 'node:fs/promises';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

const mock = JSON.parse(await readFile(new URL('./mockData.json', import.meta.url), 'utf8'));

/**
 * Inserts mock projects and tasks into the database, mapping numeric IDs to ObjectIds.
 * @returns {Promise<{ projects: number, tasks: number }>}
 */
export async function insertMockData() {
  const idMap = new Map(); // mock numeric id -> new ObjectId
  for (const p of mock.projects) {
    const doc = await Project.create({
      title: p.title,
      description: p.description,
      status: p.status,
      deadline: new Date(`${p.deadline}T00:00:00.000Z`),
    });
    idMap.set(p.id, doc._id);
  }

  await Task.insertMany(
    mock.tasks.map((t) => ({
      project: idMap.get(t.projectId),
      title: t.title,
      description: t.description,
      status: t.status,
    })),
  );

  return { projects: mock.projects.length, tasks: mock.tasks.length };
}

/**
 * Seeds mock data only if the database is currently empty.
 * @returns {Promise<void>}
 */
export async function seedIfEmpty() {
  if ((await Project.countDocuments()) > 0) {
    // eslint-disable-next-line no-console
    console.log('Database already has data, skipping seed');
    return;
  }
  const r = await insertMockData();
  // eslint-disable-next-line no-console
  console.log(`Seeded ${r.projects} projects and ${r.tasks} tasks`);
}
