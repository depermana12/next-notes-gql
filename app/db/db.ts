import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
const { Pool } = pg;
import * as dbSchema from "./schema";

const pool = new Pool({
  database: process.env.DB_NAME || "gqlnotes",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "nextgql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
});

const db = drizzle({ client: pool, schema: dbSchema });

export default db;
