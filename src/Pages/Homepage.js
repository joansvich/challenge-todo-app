import React, { Component } from 'react';
import RenderList from '../Components/RenderList';
import FormTodo from '../Components/FormTodo';
import todoService from '../lib/todo-service';

class Homepage extends Component {

  state = {
    isLoading: true,
    todoList: []
  }

  componentDidMount = async () => {
    try {
      const todoList = await todoService.getAllTodos();
      console.log(todoList);
      this.setState({
        todoList,
        isLoading: false
      })
    } catch (error) {
    }
  }

  todoList(list) {
    return this.state.todoList.map((todo, id) => {
      const {title,body} = todo;
      return (
        <li>{title} - {body}</li>
      )
    })
  }

  addTodoList = (newTodo) => {
    console.log(newTodo);
    this.setState({
      todoList: [...this.state.todoList,newTodo]
    })
  }

  render() {
    const list = todoService.getAllTodos()
    return (
      <div>
        <h1>Homepage</h1>
        <ul>
          {this.state.isLoading ? <p>Cargando...</p> : this.todoList(list)}
        </ul>
        <FormTodo 
          addTodoList={this.addTodoList}
        />
      </div>
    );
  }
}

export default Homepage;