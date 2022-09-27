import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StateService } from './service/state.service';
import { ToDoApi } from './todo-state/todo.model';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: ToDoApi,
          useClass: StateService,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
