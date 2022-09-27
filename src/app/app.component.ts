import { Component } from '@angular/core';
import { ToDoApi } from './todo-state/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-todo';
  constructor(private readonly todoService: ToDoApi) {}

  todos$ = this.todoService.todos$;
  numberOfActive$ = this.todoService.numberOfActive$;

  addToDo(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputElementValue = inputElement.value;
    inputElement.value = '';
    console.log(inputElementValue);

    this.todoService.addToDo({
      title: inputElementValue,
      completed: false,
    });
  }

  removeToDo(id: string) {
    this.todoService.removeToDo(id);
  }

  toggleToDo(id: string) {
    this.todoService.toggleToDo(id);
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }
}
