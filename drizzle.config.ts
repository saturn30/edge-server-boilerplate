import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: process.env.DB_ENV === "prod" ? ".env" : ".env.dev" });

export default {
  schema: "./src/database/schemas",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.DB_URL || "",
    authToken: process.env.DB_AUTH_TOKEN,
  },
} satisfies Config;
