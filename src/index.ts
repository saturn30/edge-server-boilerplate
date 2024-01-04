import { todoRoutes } from "./features/todo/todo.routes";
import { createApp } from "./utils/createApp";

const app = createApp();

app.route("/todo", todoRoutes);

app.get("/", (c) => c.text("Hello Hono!"));

export default app;
