import { createApp } from "../../utils/createApp";
import { TodoService } from "./todo.service";

export const todoRoutes = createApp();

todoRoutes.get("/", (c) => {
  const todoService = new TodoService();

  return c.json(todoService.getAll());
});

todoRoutes.get("/:id", (c) => {
  const todoService = new TodoService();
  const { id } = c.req.param();

  return c.json(todoService.getItem(Number(id)));
});

todoRoutes.post("/", async (c) => {
  const todoService = new TodoService();
  const body = await c.req.json<{ title: string }>();
  todoService.add(body.title);

  return c.json({ result: "done" });
});

todoRoutes.put("/:id", async (c) => {
  const todoService = new TodoService();
  const { id } = c.req.param();
  todoService.toggle(Number(id));

  return c.json({ result: "done" });
});

todoRoutes.delete("/:id", async (c) => {
  const todoService = new TodoService();
  const { id } = c.req.param();
  todoService.delete(Number(id));

  return c.json({ result: "done" });
});
