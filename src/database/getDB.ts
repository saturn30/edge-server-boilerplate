import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { Bindings } from "~/types/app";

import { todos } from "./schemas/todo";

export const getDB = (env: Bindings) => {
  const client = createClient({
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  });
  return drizzle(client, { schema: { todos } });
};

export type DB = ReturnType<typeof getDB>;
