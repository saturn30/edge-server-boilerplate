import { createApp } from "./utils/createApp";

const app = createApp();

app.get("/", (c) => c.text("Hello Hono!"));

export default app;
