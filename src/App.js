import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.newTodo = this.newTodo.bind(this);
  }

  newTodo(todoText) {
    this.setState((prevState) => {
      let newList = prevState.todos.slice();
      newList.push({
        text: todoText,
        checked: false
      });
      return {todos: newList};
    });
  }

  render() {
    return (
      <div className="center app">
        <h1>TODO APP</h1>
        <TodoForm handleSubmit={this.newTodo}/>
        <TodoList todos={this.state.todos}/>
      </div>
    );
  }
}

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({value: ''});
    this.props.handleSubmit(this.state.value);
  }

  render() {
    return (
      <div className="todoForm">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="TodoForm"
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            value={this.state.value}
          />
        </form>
      </div>
    );
  }
}

class TodoList extends Component {
  constructor(props) {
    super(props);
    var todos = props.todos || [];
    todos = todos.map((value, index) => {
      return {
        id: index,
        todo: value.text,
        checked: value.checked
      }
    });
    this.state = {
      todos: todos
    };
  }

  componentWillReceiveProps(nextProps) {
    var todos = nextProps.todos || [];
    todos = todos.map((value, index) => {
      return {
        id: index,
        todo: value.text,
        checked: value.checked
      };
    });
    this.setState({
      todos: todos
    });
  }

  render() {
    const todos = this.state.todos.map((todo) => {
      return (
        <li key={todo.id}>
          <TodoItem checked={todo.checked} todo={todo.todo} />
        </li>
      );
    })
    return (
      <div className="todoList">
        <ul>
          {todos}
        </ul>
      </div>
    )
  }
}

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.checked
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    // TODO: Decide if I want to keep this or change
    // also see .todoButton:focus in App.css
    //event.target.blur();
    this.setState((prevState) => {
      return {
        checked: !prevState.checked
      };
    });
  }

  render() {
    return (
      <div className="todoItem">
        <input type="checkbox" onClick={this.handleClick} className='taskButton' checked={this.state.checked}></input>
        <span className="taskName">{this.props.todo}</span>
      </div>
    );
  }
}

export default TodoApp;
