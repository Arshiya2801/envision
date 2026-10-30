import 'dotenv/config';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { seedIfEmpty } from './seed/seedData.js';

const PORT = process.env.PORT || 5000;
if (!process.env.MONGODB_URI) {
  // eslint-disable-next-line no-console
  console.error('MONGODB_URI is not set. Copy .env.example to .env.');
  process.exit(1);
}

await connectDB(process.env.MONGODB_URI);
await seedIfEmpty();

createApp().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on port ${PORT}`);
});
