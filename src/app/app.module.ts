import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StateService } from './service/state.service';
import { ToDoApi } from './todo-state/todo.model';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: ToDoApi,
      useClass: StateService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
