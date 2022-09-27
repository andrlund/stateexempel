import {
  createEmptyState,
  ToDoState,
  addToDo,
  removeToDo,
  toggleToDo,
  clearCompleted,
} from '../todo-state/todo.state';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, share, startWith, tap } from 'rxjs';
import { ToDo, ToDoApi, Visibility } from '../todo-state/todo.model';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StateService implements ToDoApi {
  state: ToDoState;
  state$$ = new ReplaySubject<ToDoState>(1);
  state$: Observable<ToDoState>;
  todos$: Observable<readonly ToDo[]>;
  numberOfActive$: Observable<number>;

  constructor() {
    this.state = createEmptyState();
    this.state$ = this.state$$.pipe(tap(console.log));
    this.todos$ = this.state$.pipe(
      share(),
      map((state) => [...state.todos])
    );
    this.numberOfActive$ = this.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.completed).length),
      startWith(0)
    );
  }

  addToDo(toDo: ToDo): void {
    const newToDo: ToDo = {
      ...toDo,
      id: uuidv4(),
    };
    this.state = addToDo(this.state, newToDo);
    this.state$$.next(this.state);
  }

  removeToDo(id: string): void {
    this.state = removeToDo(this.state, id);
    this.state$$.next(this.state);
  }

  toggleToDo(id: string): void {
    this.state = toggleToDo(this.state, id);
    this.state$$.next(this.state);
  }

  clearCompleted(): void {
    this.state = clearCompleted(this.state);
    this.state$$.next(this.state);
  }
}
