import { OpenAPIHono } from "@hono/zod-openapi";
import { todosDocRoutes } from "~/features/todo/todo.doc";

export const docs = new OpenAPIHono();

const docRoutes = [...todosDocRoutes];

for (const route of docRoutes) {
  docs.openapi(route, (c) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return c.json({ result: "done" } as any);
  });
}

// The OpenAPI documentation will be available at /doc
docs.doc("/", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});
