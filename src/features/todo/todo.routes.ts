import { createApp } from "../../utils/createApp";
import { TodoService } from "./todo.service";

export const todoRoutes = createApp<{ todoService: TodoService }>();

// 서비스 인스턴스 생성 후 var에 할당
todoRoutes.use(async (c, next) => {
  c.set("todoService", new TodoService());
  await next();
});

todoRoutes.get("/", (c) => {
  return c.json(c.var.todoService.getAll());
});

todoRoutes.get("/:id", (c) => {
  const { id } = c.req.param();

  return c.json(c.var.todoService.getItem(Number(id)));
});

todoRoutes.post("/", async (c) => {
  const body = await c.req.json<{ title: string }>();
  c.var.todoService.add(body.title);

  return c.json({ result: "done" });
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
