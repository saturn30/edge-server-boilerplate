import { eq } from "drizzle-orm";
import { DB } from "~/database/getDB";
import { todos } from "~/database/schemas/todo";

export class TodoRepository {
  constructor(private db: DB) {}

  findAll() {
    return this.db.query.todos.findMany();
  }

  findOne(id: number) {
    return this.db.query.todos.findFirst({
      where: (todos, { eq }) => eq(todos.id, id),
    });
  }

  insertOne(todo: { title: string }) {
    return this.db.insert(todos).values(todo).returning();
  }

  async toggleOne(id: number) {
    const todo = await this.findOne(id);
    if (!todo) throw new Error("Todo not found");

    return this.db
      .update(todos)
      .set({ checked: !todo.checked })
      .where(eq(todos.id, id))
      .returning();
  }

  deleteOne(id: number) {
    return this.db.delete(todos).where(eq(todos.id, id)).returning();
  }
}
