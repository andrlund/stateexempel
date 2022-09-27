import { ToDo } from './todo.model';

export type ToDoState = {
  readonly todos: readonly ToDo[];
};

export const createEmptyState = (): ToDoState => ({
  todos: [],
});

export const addToDo = (state: ToDoState, todo: ToDo): ToDoState => ({
  ...state,
  todos: [...state.todos, { ...todo }],
});

export const removeToDo = (state: ToDoState, id: string): ToDoState => ({
  ...state,
  todos: [...state.todos.filter((todo) => todo.id !== id)],
});

export const toggleToDo = (state: ToDoState, id: string): ToDoState => ({
  ...state,
  todos: state.todos.map((todo) => ({
    ...todo,
    completed: todo.id === id ? !todo.completed : todo.completed,
  })),
});

export const clearCompleted = (state: ToDoState) => ({
  ...state,
  todos: state.todos.filter((todo) => !todo.completed),
});
