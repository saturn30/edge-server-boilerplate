import { TodoRepository } from "./todo.repository";

interface TodoItem {
  id: number;
  title: string;
  checked: boolean;
}

export class TodoService {
  constructor(private todoRepository: TodoRepository) {}
  getAll = () => {
    return this.todoRepository.findAll();
  };

  getItem = (id: number) => {
    return this.todoRepository.findOne(id);
  };

  add = (title: string) => {
    return this.todoRepository.insertOne({ title });
  };

  toggle = async (id: number) => {
    return this.todoRepository.toggleOne(id);
  };

  delete = (id: number) => {
    return this.todoRepository.deleteOne(id);
  };
}
