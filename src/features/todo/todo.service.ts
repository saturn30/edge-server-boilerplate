interface TodoItem {
  id: number;
  title: string;
  checked: boolean;
}

let todos: TodoItem[] = [
  {
    title: "책읽기",
    checked: false,
    id: 1,
  },
];

export class TodoService {
  getAll = () => {
    return todos;
  };

  getItem = (id: number) => {
    return todos.find((todo) => todo.id === id);
  };

  add = (title: string) => {
    const newTodo = { title, checked: false, id: todos.length + 1 };
    todos.push(newTodo);

    return newTodo;
  };

  toggle = async (id: number) => {
    todos = todos.map((todo) => {
      return {
        ...todo,
        checked: todo.id === id ? !todo.checked : todo.checked,
      };
    });

    return await this.getItem(id);
  };

  delete = (id: number) => {
    todos = todos.filter((todo) => todo.id !== id);
  };
}
