import { ToDo } from './todo.model';
import {
  addToDo,
  clearCompleted,
  createEmptyState,
  removeToDo,
  toggleToDo,
} from './todo.state';

describe('Todo-state', () => {
  it('createEmptyState skapar ett tomt stateobjekt', () => {
    const state = createEmptyState();

    expect(state).toEqual({
      todos: [],
    });
  });

  it('addToDo skapar nytt state med tillagd todo', () => {
    const EXPECTED_NUMBER_OF_TODOS = 3;
    let state = createEmptyState();
    const todos: ToDo[] = [
      {
        id: 'ABC',
        title: 'TODO 1',
        completed: true,
      },
      {
        id: 'DEF',
        title: 'TODO 2',
        completed: false,
      },
    ];

    const newToDo: ToDo = {
      id: 'GHI',
      title: 'TODO 3',
      completed: false,
    };

    state = {
      ...state,
      todos: [...todos],
    };
    const newState = addToDo(state, newToDo);

    expect(newState.todos.length).toBe(EXPECTED_NUMBER_OF_TODOS);
  });

  it('removeToDo skapar nytt med utan borttagen todo', () => {
    let state = createEmptyState();
    const todos: ToDo[] = [
      {
        id: 'ABC',
        title: 'TODO 1',
        completed: true,
      },
      {
        id: 'DEF',
        title: 'TODO 2',
        completed: false,
      },
      {
        id: 'GHI',
        title: 'TODO 3',
        completed: false,
      },
    ];

    state = {
      ...state,
      todos: [...todos],
    };
    const newState = removeToDo(state, 'DEF');
    expect(newState.todos).toEqual([
      {
        id: 'ABC',
        title: 'TODO 1',
        completed: true,
      },
      {
        id: 'GHI',
        title: 'TODO 3',
        completed: false,
      },
    ]);
  });

  it('toggleTodo sätter avklarad todo till oavklarad', () => {
    let state = createEmptyState();
    state = addToDo(state, {
      id: 'ABC',
      title: 'TODO 1',
      completed: true,
    });

    state = toggleToDo(state, 'ABC');
    expect(state.todos[0].completed).toBeFalse();
  });

  it('toggleTodo sätter oavklarad todo till avklarad', () => {
    let state = createEmptyState();
    state = addToDo(state, {
      id: 'ABC',
      title: 'TODO 1',
      completed: false,
    });

    state = toggleToDo(state, 'ABC');
    expect(state.todos[0].completed).toBeTrue();
  });

  it('clearCompleted tar bort avklarade todos', () => {
    let state = createEmptyState();
    const todos: ToDo[] = [
      {
        id: 'ABC',
        title: 'TODO 1',
        completed: true,
      },
      {
        id: 'DEF',
        title: 'TODO 2',
        completed: false,
      },
      {
        id: 'GHI',
        title: 'TODO 3',
        completed: true,
      },
    ];

    state = {
      ...state,
      todos,
    };

    state = clearCompleted(state);

    expect(state.todos).toEqual([
      {
        id: 'DEF',
        title: 'TODO 2',
        completed: false,
      },
    ]);
  });
});
