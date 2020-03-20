class HistorySingleton {
  constructor() {
    this.history;
    if (localStorage.getItem('history')) {
      this.history = JSON.parse(localStorage.getItem('history'));
    } else {
      this.history = [];
      this.sync();
    }
  }
  add(obj) {
    this.history.push(obj);
    this.sync();
  }
  delete(obj) {
    // TODO
    // this.history.remove(obj);
    // this.sync();
  }
  get() {
    return this.history;
  }
  clean() {
    this.history = [];
    this.sync();
  }
  sync() {
    localStorage.setItem('history', JSON.stringify(this.history));
  }
};

const singleton = new HistorySingleton();
export default singleton;