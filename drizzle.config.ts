import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./app/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    database: process.env.DB_NAME || "gqlnotes",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "nextgql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    ssl: false,
  },
});
