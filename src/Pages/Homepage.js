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

  deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      const newTodoList = this.state.todoList.filter((todo) => {
        return todo._id !== id
      })
      this.setState({
        todoList: newTodoList
      })
    } catch (error) {
    }
  }

  updateTodo = async (id, todo) => {
    try {
      await todoService.updateTodo(id, todo);
      const newTodoList = this.state.todoList.filter((todo) => {
        return todo._id !== id
      })
      this.setState({
        todoList: [...newTodoList, todo]
      })

    } catch (error) {
    }
  }

  doneTodo = async (id, todo) => {
    try {
      await todoService.updateTodo(id, todo);
      const newTodoList = this.state.todoList.filter((todo) => {
        return todo._id !== id
      })
      this.setState({
        todoList: newTodoList
      })

    } catch (error) {
    }
  }

  addTodoList = (newTodo) => {
    this.setState({
      todoList: [...this.state.todoList, newTodo]
    })
  }

  todoList() {
    return this.state.todoList.map((todo, id) => {
      if (!todo.done) {
        return (
          <CardTodo
            key={`id-${id}`}
            todo={todo}
            deleteTodo={this.deleteTodo}
            updateTodo={this.updateTodo}
            doneTodo={this.doneTodo}
          />
        )
      }
    })
  }

  todoListDone() {
    return this.state.todoList.map((todo, id) => {
      if (todo.done) {
        return (
          <CardTodo
            key={`id-${id}`}
            todo={todo}
            deleteTodo={this.deleteTodo}
            updateTodo={this.updateTodo}
          />
        )
      }
    })
  }


  render() {
    const list = todoService.getAllTodos()
    return (
      <div className="container">
        <section className="add-todo">
          <h1 className="title">Añadir Todo</h1>
          <FormTodo
            addTodoList={this.addTodoList}
          />
        </section>
        <section className="todo-list">
          <h1 className="title">To-do List</h1>
          <ul className="list-Todo">
            {this.state.isLoading ? <p>Cargando...</p> : this.todoList(list)}
          </ul>
        </section>
        <section className="todo-done">
          <h1 className="title">To-do done</h1>
          <ul className="list-Todo">
            {this.state.isLoading ? <p>Cargando...</p> : this.todoListDone(list)}
          </ul>
        </section>

      </div>
    );
  }
}

export default Homepage;