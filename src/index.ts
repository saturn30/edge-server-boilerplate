import { swaggerUI } from "@hono/swagger-ui";

import { docs } from "~/docs/docs";
import { todoRoutes } from "~/features/todo/todo.routes";
import { createApp } from "~/utils/createApp";

const app = createApp();

app.route("/todos", todoRoutes);
app.route("/doc", docs);

app.get("/ui", swaggerUI({ url: "/doc" }));
app.get("/", (c) => c.text("Hello Hono!"));

export default app;
