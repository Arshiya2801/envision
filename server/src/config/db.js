import dns from 'node:dns';
import mongoose from 'mongoose';

/**
 * Connects to MongoDB with DNS fallback for environments blocking SRV lookups.
 * @param {string} uri - MongoDB connection string
 * @returns {Promise<typeof mongoose>}
 */
export async function connectDB(uri) {
  try {
    return await mongoose.connect(uri);
  } catch (err) {
    if (err.message && err.message.includes('querySrv ECONNREFUSED')) {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
      return await mongoose.connect(uri);
    }
    throw err;
  }
}
