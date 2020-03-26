import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import App from '../src/App';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  todos: [],
  form: {
    id: null,
    name: '',
    createdOn: null,
    done: false
  },
  isTracking: false,
};

describe('<App />', () => {

  let container, store;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    store = mockStore(initialState);

    act(() => {
      ReactDOM.render(<App store={store} />, container);
    });
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    container = null;

    store = null;
  });

  it('should render properly', () => {
    const input = container.querySelector('input');

    expect(input).toBeDefined();
    expect(store.getState()).toEqual(initialState);
  });

  it('should change the state when typing', () => {
    const input = container.querySelector('input');
    const inputChange = { type: 'INPUT_CHANGE', payload: { name: 'Todo test' } };

    act(() => {
      input.value = 'Todo test';
      let event = new CustomEvent('change', { bubbles: true });
      input.dispatchEvent(event);
      store.dispatch(inputChange);
    });

    expect(input.value).toBe('Todo test');
    expect(store.getActions()).toEqual([inputChange]);
  });

  it('should add a new todo when clicking add button', () => {
    const now = new Date();
    const newTodo = {
      id: now.getTime(),
      name: 'This is a test',
      createdOn: now,
      done: false
    };

    const addTodo = { type: 'TODO_ADD', payload: {
      todo: newTodo
    }};

    act(() => {
      store.dispatch(addTodo);
    });

    expect(store.getActions()).toEqual([addTodo]);
  });

  // TODO:
  // 1. single to-do should be removed clicking delete
  // 2. signle to-do should be edited clicking edit
  // 3. spy the localStorage usage, e.g.
  // spyOn(localStorage, 'getItem').and.returnValue { id: ...., name: .... }
  // spyOn(localStorage, 'setItem).and.callFake(() => { ... set a mock to do ... })
});