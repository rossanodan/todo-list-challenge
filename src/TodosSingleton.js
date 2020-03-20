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
    delete(obj) {
      const id = obj.todo.id;
      console.log('Removing', id);
      this.todos = this.todos.filter(todo => todo.id !== id);
      console.log('New todos', this.todos);
      // TODO
      // this.history.remove(obj);
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