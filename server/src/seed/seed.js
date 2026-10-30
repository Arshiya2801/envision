import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import { insertMockData } from './seedData.js';

if (!process.env.MONGODB_URI) {
  // eslint-disable-next-line no-console
  console.error('MONGODB_URI is not set. Copy .env.example to .env.');
  process.exit(1);
}

await connectDB(process.env.MONGODB_URI);
await Task.deleteMany({});
await Project.deleteMany({});
const r = await insertMockData();
// eslint-disable-next-line no-console
console.log(`Seeded ${r.projects} projects and ${r.tasks} tasks`);
await mongoose.disconnect();
