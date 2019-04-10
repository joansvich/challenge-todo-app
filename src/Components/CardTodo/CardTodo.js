import React, { Component } from 'react';
import './cardtodo.css';

class CardTodo extends Component {
  state = {
    title: this.props.todo.title,
    body: this.props.todo.body,
    edit: false
  }


  handleEdit = () => {
    this.setState({
      edit: true
    })
  }

  handleDone = (_id) => {
    const todo = { title: this.state.title, body: this.state.body, done:true}
    this.props.doneTodo(_id,todo)
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (_id) => {
    const todo = { title: this.state.title, body: this.state.body }
    this.props.updateTodo(_id, todo);
    this.setState({
      edit: false
    })
  }

  render() {
    const { _id } = this.props.todo;
    const { title, body } = this.state;
    if (this.state.edit) {
      return (
        <form className="container-card-todo" onSubmit={() => { this.handleSubmit(_id) }}>
          <input required type="text" name="title" onChange={this.handleChange} value={title} />
          <input required type="text" name="body" onChange={this.handleChange} value={body} />
          <div className="card-todo-buttons">
            <button className="edit">Done</button>
          </div>
        </form>
      )
    } else {
      return (
        <div className="container-card-todo">
          <h1>{this.state.title}</h1>
          <p>{this.state.body}</p>
          <div className="card-todo-buttons">
            <button className="delete" onClick={() => { this.props.deleteTodo(_id) }}>X</button>
            <button className="edit" onClick={this.handleEdit}>Edit</button>
            <button className="edit" onClick={this.handleDone}>Done</button>
          </div>
        </div>
      )
    }
  }
}

export default CardTodo;