import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
const { Pool } = pg;
import * as dbSchema from "./schema";

const pool = new Pool({
  database: "gqlnotes",
  user: "postgres",
  password: "nextgql",
  host: "localhost",
  port: 5432,
});

const db = drizzle({ client: pool, schema: dbSchema });

export default db;
