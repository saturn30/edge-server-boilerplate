import { swaggerUI } from "@hono/swagger-ui";

import { docs } from "~/docs/docs";
import { todoRoutes } from "~/features/todo/todo";
import { createApp } from "~/utils/createApp";
import { authRoutes } from "./features/auth/auth";

const app = createApp();

app.route("/todos", todoRoutes);
app.route("/auth", authRoutes);
app.route("/doc", docs);

app.get("/swagger", swaggerUI({ url: "/doc" }));
app.get("/", (c) => c.text("Hello Hono!"));

export default app;
