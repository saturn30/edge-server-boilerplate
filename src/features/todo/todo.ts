import { getDB } from "~/database/getDB";
import { ApiError } from "~/utils/ApiError";
import { createApp } from "~/utils/createApp";

import { TodoRepository } from "./todo.repository";
import { TodoService } from "./todo.service";

export const todoRoutes = createApp<{ todoService: TodoService }>();

// 서비스 인스턴스 생성 후 var에 할당
todoRoutes.use("*", async (c, next) => {
  const db = getDB(c.env);
  const todoRepository = new TodoRepository(db);
  c.set("todoService", new TodoService(todoRepository));
  await next();
});

todoRoutes.get("/:id", async (c) => {
  const { id } = c.req.param();
  const todo = await c.var.todoService.getItem(Number(id));

  if (!todo) {
    throw new ApiError(404, { message: "Todo not found" });
  }

  return c.json(todo);
});

todoRoutes.get("/", async (c) => {
  const todos = await c.var.todoService.getAll();
  return c.json(todos);
});

todoRoutes.post("/", async (c) => {
  const body = await c.req.json<{ title: string }>();
  const newTodo = await c.var.todoService.add(body.title);

  return c.json(newTodo);
});

todoRoutes.put("/:id", async (c) => {
  const { id } = c.req.param();
  await c.var.todoService.toggle(Number(id));

  return c.json({ result: "done" });
});

todoRoutes.delete("/:id", async (c) => {
  const { id } = c.req.param();
  await c.var.todoService.delete(Number(id));

  return c.json({ result: "done" });
});
