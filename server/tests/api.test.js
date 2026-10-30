import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from '../src/app.js';
import Project from '../src/models/Project.js';
import Task from '../src/models/Task.js';
import { insertMockData } from '../src/seed/seedData.js';

let mongoServer;
let app;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  app = createApp();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Task.deleteMany({});
  await Project.deleteMany({});
  await insertMockData();
});

describe('Backend API Tests', () => {
  it('1. GET /api/health returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('2. GET /api/projects returns 10 items sorted by deadline asc with counts and no _id', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(10);
    for (let i = 0; i < res.body.length - 1; i++) {
      expect(new Date(res.body[i].deadline).getTime()).toBeLessThanOrEqual(
        new Date(res.body[i + 1].deadline).getTime(),
      );
    }
    const first = res.body[0];
    expect(first).toHaveProperty('id');
    expect(first).not.toHaveProperty('_id');
    expect(first).toHaveProperty('taskCount');
    expect(first).toHaveProperty('completedTaskCount');
  });

  it('3. GET /api/projects with status filter', async () => {
    const resActive = await request(app).get('/api/projects?status=Active');
    expect(resActive.status).toBe(200);
    expect(resActive.body).toHaveLength(6);
    expect(resActive.body.every((p) => p.status === 'Active')).toBe(true);

    const resWrong = await request(app).get('/api/projects?status=Wrong');
    expect(resWrong.status).toBe(400);
    expect(resWrong.body.error).toHaveProperty('message');
  });

  it('4. POST /api/projects validation', async () => {
    const valid = {
      title: 'Valid Project Title',
      description: 'A valid description',
      status: 'Active',
      deadline: '2026-11-20',
    };
    const resValid = await request(app).post('/api/projects').send(valid);
    expect(resValid.status).toBe(201);
    expect(resValid.body.title).toBe(valid.title);

    const resShortTitle = await request(app)
      .post('/api/projects')
      .send({ ...valid, title: 'ab' });
    expect(resShortTitle.status).toBe(400);
    expect(resShortTitle.body.error.details.some((d) => d.field === 'title')).toBe(true);

    const resNoDeadline = await request(app)
      .post('/api/projects')
      .send({ title: 'No Deadline Title' });
    expect(resNoDeadline.status).toBe(400);
  });

  it('5. PUT /api/projects/:id updates project and validates', async () => {
    const projects = await Project.find();
    const id = projects[0]._id.toString();

    const resEmpty = await request(app).put(`/api/projects/${id}`).send({});
    expect(resEmpty.status).toBe(400);

    const resInvalidId = await request(app)
      .put('/api/projects/abc')
      .send({ title: 'New Valid Title' });
    expect(resInvalidId.status).toBe(400);

    const unknownId = new mongoose.Types.ObjectId().toString();
    const resNotFound = await request(app)
      .put(`/api/projects/${unknownId}`)
      .send({ title: 'New Valid Title' });
    expect(resNotFound.status).toBe(404);

    const resUpdate = await request(app)
      .put(`/api/projects/${id}`)
      .send({ title: 'Updated Project Title' });
    expect(resUpdate.status).toBe(200);
    expect(resUpdate.body.title).toBe('Updated Project Title');
  });

  it('6. DELETE /api/projects/:id cascades and removes associated tasks', async () => {
    const project = await Project.findOne();
    const id = project._id.toString();

    const taskCountBefore = await Task.countDocuments({ project: id });
    expect(taskCountBefore).toBeGreaterThan(0);

    const resDelete = await request(app).delete(`/api/projects/${id}`);
    expect(resDelete.status).toBe(204);

    const taskCountAfter = await Task.countDocuments({ project: id });
    expect(taskCountAfter).toBe(0);

    const resGet = await request(app).get(`/api/projects/${id}`);
    expect(resGet.status).toBe(404);
  });

  it('7. GET /api/projects/:id/tasks returns project tasks', async () => {
    const project = await Project.findOne({ title: 'E‑Commerce Website Redesign' });
    const res = await request(app).get(`/api/projects/${project._id}/tasks`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  it('8. POST /api/projects/:id/tasks creates task or 404 for unknown project', async () => {
    const project = await Project.findOne();
    const resValid = await request(app)
      .post(`/api/projects/${project._id}/tasks`)
      .send({ title: 'New Task Title', status: 'Pending' });
    expect(resValid.status).toBe(201);
    expect(resValid.body.projectId).toBe(project._id.toString());

    const unknownId = new mongoose.Types.ObjectId().toString();
    const resNotFound = await request(app)
      .post(`/api/projects/${unknownId}/tasks`)
      .send({ title: 'New Task Title' });
    expect(resNotFound.status).toBe(404);
  });

  it('9. PUT /api/tasks/:id updates task or returns 400 for bad status', async () => {
    const task = await Task.findOne();
    const res = await request(app).put(`/api/tasks/${task._id}`).send({ status: 'Completed' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('Completed');

    const resBad = await request(app).put(`/api/tasks/${task._id}`).send({ status: 'Done' });
    expect(resBad.status).toBe(400);
  });

  it('10. DELETE /api/tasks/:id deletes task', async () => {
    const task = await Task.findOne();
    const resDelete = await request(app).delete(`/api/tasks/${task._id}`);
    expect(resDelete.status).toBe(204);

    const resGet = await request(app).get(`/api/tasks/${task._id}`);
    expect(resGet.status).toBe(404);
  });

  it('11. GET /api/dashboard/summary matches mock seed numbers', async () => {
    const res = await request(app).get('/api/dashboard/summary');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      totalProjects: 10,
      activeProjects: 6,
      completedProjects: 2,
      onHoldProjects: 2,
      totalTasks: 20,
      completedTasks: 6,
      inProgressTasks: 5,
      pendingTasks: 14,
    });
  });
});
