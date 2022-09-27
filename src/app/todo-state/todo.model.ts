import { Observable } from 'rxjs';

export abstract class ToDoApi {
  abstract todos$: Observable<readonly ToDo[]>;
  abstract numberOfActive$: Observable<number>;
  abstract addToDo(todo: Partial<ToDo>): void;
  abstract removeToDo(id: string): void;
  abstract toggleToDo(id: string): void;
  abstract clearCompleted(): void;
}

export type Visibility = {
  readonly showCompleted: boolean;
  readonly showActive: boolean;
};

export type ToDo = {
  id: string;
  title: string;
  completed: boolean;
};
