import React, { Component } from 'react';
import FormTodo from '../Components/FormTodo/FormTodo';
import todoService from '../lib/todo-service';
import CardTodo from '../Components/CardTodo/CardTodo';
import './homepage.css'

class Homepage extends Component {

  state = {
    isLoading: true,
    todoList: []
  }

  componentDidMount = async () => {
    try {
      const todoList = await todoService.getAllTodos();
      this.setState({
        todoList,
        isLoading: false
      })
    } catch (error) {
    }
  }

  deleteTodo = async (id) =>{
    try {
      await todoService.deleteTodo(id);
      const newTodoList = this.state.todoList.filter((todo)=>{
        return todo._id !== id
      })
      this.setState({
        todoList:newTodoList
      })
    } catch (error) {
    }
  }

  todoList() {
    return this.state.todoList.map((todo, id) => {
      return (
        <CardTodo 
          key={`id-${id}`}
          todo={todo}
          deleteTodo={this.deleteTodo}
        />
      )
    })
  }

  addTodoList = (newTodo) => {
    this.setState({
      todoList: [...this.state.todoList,newTodo]
    })
  }

  render() {
    const list = todoService.getAllTodos()
    return (
      <div className="container">
        <h1 className="title">To-do List</h1>
        <ul className="list-Todo">
          {this.state.isLoading ? <p>Cargando...</p> : this.todoList(list)}
        </ul>
        <h1 className="title">Añadir Todo</h1>
        <FormTodo 
          addTodoList={this.addTodoList}
        />
      </div>
    );
  }
}

export default Homepage;