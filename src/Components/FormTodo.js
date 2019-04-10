import React, { Component } from 'react';
import todoService from '../lib/todo-service';

class FormTodo extends Component {

  state = {
    title: "",
    body: ""
  }

  handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const newTodo = await todoService.createTodo(this.state);
      this.props.addTodoList(newTodo);
    } catch (error) {
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" onChange={this.handleChange} name="title" placeholder="Titulo" />
          <input type="text" onChange={this.handleChange} name="body" placeholder="Descripcion" />
          <input type="submit" value="Crear"/>
        </form>
      </div>
    );
  }
}

export default FormTodo;