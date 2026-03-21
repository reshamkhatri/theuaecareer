import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  lastFailureAt: number | null;
  lastFailureError: Error | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
  lastFailureAt: null,
  lastFailureError: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  const isLocalMongo =
    MONGODB_URI.includes('localhost') || MONGODB_URI.includes('127.0.0.1');
  const failureCooldownMs = process.env.NODE_ENV === 'production' ? 5000 : 30000;

  if (cached.conn) {
    return cached.conn;
  }

  if (
    cached.lastFailureAt &&
    Date.now() - cached.lastFailureAt < failureCooldownMs &&
    cached.lastFailureError
  ) {
    throw cached.lastFailureError;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      serverSelectionTimeoutMS:
        process.env.NODE_ENV !== 'production' && isLocalMongo ? 800 : 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      cached.lastFailureAt = null;
      cached.lastFailureError = null;
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.lastFailureAt = Date.now();
    cached.lastFailureError = e instanceof Error ? e : new Error(String(e));
    throw e;
  }

  return cached.conn;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(MONGODB_URI);
}

export default dbConnect;
