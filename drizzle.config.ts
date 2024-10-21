import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./app/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    database: "gqlnotes",
    user: "postgres",
    password: "nextgql",
    host: "localhost",
    port: 5432,
    ssl: false,
  },
});
