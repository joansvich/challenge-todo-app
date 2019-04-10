import React, { Component } from 'react';
import FormTodo from '../Components/FormTodo';
import todoService from '../lib/todo-service';
import CardTodo from '../Components/CardTodo/CardTodo';
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