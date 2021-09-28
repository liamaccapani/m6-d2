import pg from "pg";
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pg;
const { DATABASE_URL: connectionString } = process.env;

export const pool = new Pool({
  connectionString,
});

