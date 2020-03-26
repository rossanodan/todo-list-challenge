# To Do List Challenge

### Architecture

![The architecture](./architectureSingleton.png)

### Technology stack

* React (and ReactDOM)
* ES6
* Webpack (bundler and live webserver - live reload)
* Babel (ES6 to "plain javascript" for the browser)
* Redux (application state management)
* Redux Thunk
* Karma and Jasmine for unit testing

### How to use

#### Run the project locally

```
git clone https://github.com/rossanodan/todo-list-challenge.git
cd todo-list-challenge
npm install
npm start
```

#### Build the project for production

```
npm run build
```

#### Test

```
npm test
```

#### What's next (what I'd do to improve the project)

* Code review and refactoring - I think the actual code can be refactored into more testable components
* Refactor the Redux store creating action creators - more testable
* UX analysis to understand how the UI can be improved (colours, layout and number of clicks the user has to perform)
* Setup a CI/CD pipeline - Travis CI, Circle CI, etc - and automated deployment if the build is green
  * run a job for each PR and if it's green "open the gate" to master and merge
* Deploy the project on Firebase - I like using it. It's free and it easy to use for monitoring and for scaling resources (auto scaling)