import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const dbConfig = {
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false }, // Adjust SSL options based on your PostgreSQL configuration
  connectionTimeoutMillis: 5000, // Adjust connection timeout if needed
};

const pool = new Pool(dbConfig);

export const connect = async (): Promise<void> => {
  try {
    // Connect to the pool
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database');
    // Release the client back to the pool when done
    client.release();
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
    throw error;
  }
};

export { pool };
