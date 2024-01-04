interface TodoItem {
  id: number;
  title: string;
  checked: boolean;
}

let todos: TodoItem[] = [];

export class TodoService {
  getAll() {
    return todos;
  }

  getItem(id: number) {
    return todos.find((todo) => todo.id === id);
  }

  add(title: string) {
    todos.push({ title, checked: false, id: todos.length + 1 });
  }

  toggle(id: number) {
    todos = todos.map((todo) => {
      return {
        ...todo,
        checked: todo.id === id ? !todo.checked : todo.checked,
      };
    });
  }

  delete(id: number) {
    todos = todos.filter((todo) => todo.id !== id);
  }
}
