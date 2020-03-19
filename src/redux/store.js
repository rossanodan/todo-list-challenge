import { createStore, applyMiddleware } from 'redux';
import reducers from "./reducers";

// let tracker;

// if (localStorage.getItem('tracker')) {
//   tracker = JSON.parse(localStorage.getItem('tracker'));
// } else {
//   tracker = [];
// }

const tracker = () => {
  return next => action => {
    // tracker.push(action);
    // localStorage.setItem('tracker', JSON.stringify(tracker));
    console.log('action', action);
    return next(action);
  }
}

const store = createStore(
  reducers,
  applyMiddleware(tracker)
);

export default store;