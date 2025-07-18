import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // set in .env file
  ssl: {
    rejectUnauthorized: false, // for some cloud providers like Heroku
  },
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("Executed query", { text, duration, rows: res.rowCount });
  return res;
}
