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
    console.log('input', input);
    expect(input).toBeDefined();
  });
});