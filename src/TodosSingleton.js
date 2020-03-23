class TodosSingleton {
  constructor() {
    this.todos;
    if (localStorage.getItem('todos')) {
      this.todos = JSON.parse(localStorage.getItem('todos'));
    } else {
      this.todos = [];
      this.sync();
    }
  }
  add(obj) {
    this.todos.push(obj);
    this.sync();
  }
  update(obj) {
    this.todos.map(todo => {
      if (todo.id === obj.id) {
        todo.name = obj.name;
      }
    });
    this.sync();
  }
  delete(obj) {
    const id = obj.todo.id;
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.sync();
  }
  get() {
    return this.todos;
  }
  clean() {
    this.todos = [];
    this.sync();
  }
  sync() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
};

const singleton = new TodosSingleton();
export default singleton;