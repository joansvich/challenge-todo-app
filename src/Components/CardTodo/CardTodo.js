import React, { Component } from 'react';
import './cardtodo.css';

class CardTodo extends Component {
  render() {
    const {_id,title,body} = this.props.todo;

    return (
      <div className="container-card-todo">
        <h1>{title}</h1>
        <p>{body}</p>
        <button onClick={()=>{this.props.deleteTodo(_id)}}>X</button>
        <button>Edit</button>
      </div>
    );
  }
}

export default CardTodo;