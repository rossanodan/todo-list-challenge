import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import App from '../src/App';

// Mock redux store //
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

const store = mockStore(initialState);
// Mock redux store //

describe('<App />', () => {

  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should render properly', () => {
    act(() => {
      ReactDOM.render(<App store={store} />, container);
    });

    const input = container.querySelector('input');

    expect(input).toBeDefined();
    expect(store.getState()).toEqual(initialState);
  });

  it('should change the state when typing', () => {
    act(() => {
      ReactDOM.render(<App store={store} />, container);
    });

    const input = container.querySelector('input');
    
    act(() => {
      input.value = 'Todo test';
      let event = new CustomEvent('change', { bubbles: true });
      input.dispatchEvent(event);
    });

    expect(input.value).toBe('Todo test');
  });
});