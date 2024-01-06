import { ApiError } from "../../utils/ApiError";
import { createApp } from "../../utils/createApp";
import { TodoService } from "./todo.service";

export const todoRoutes = createApp<{ todoService: TodoService }>();

// 서비스 인스턴스 생성 후 var에 할당
todoRoutes.use("*", async (c, next) => {
  c.set("todoService", new TodoService());
  await next();
});

todoRoutes.get("/:id", (c) => {
  const { id } = c.req.param();
  const todo = c.var.todoService.getItem(Number(id));

  if (!todo) {
    throw new ApiError(404, { message: "Todo not found" });
  }

  return c.json(todo);
});

todoRoutes.get("/", (c) => {
  return c.json(c.var.todoService.getAll());
});

todoRoutes.post("/", async (c) => {
  const body = await c.req.json<{ title: string }>();
  const newTodo = c.var.todoService.add(body.title);

  return c.json(newTodo);
});

todoRoutes.put("/:id", async (c) => {
  const { id } = c.req.param();
  c.var.todoService.toggle(Number(id));

  return c.json({ result: "done" });
});

todoRoutes.delete("/:id", async (c) => {
  const { id } = c.req.param();
  c.var.todoService.delete(Number(id));

  return c.json({ result: "done" });
});
