import { createStore, applyMiddleware } from 'redux';
import reducers from "./reducers";

let tracker;

if (localStorage.getItem('tracker')) {
  tracker = JSON.parse(localStorage.getItem('tracker'));
} else {
  tracker = [];
}

function logger() {
  return next => action => {
    tracker.push(action);
    localStorage.setItem('tracker', JSON.stringify(tracker));
    return next(action);
  }
}

const store = createStore(
  reducers,
  applyMiddleware(logger)
);

export default store;