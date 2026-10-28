import 'dotenv/config';
import { createApp } from './app.js';

const PORT = process.env.PORT || 5000;

createApp().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on port ${PORT}`);
});
