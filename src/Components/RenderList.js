import React, { Component } from 'react';
import todoService from '../lib/todo-service';

class RenderList extends Component {

  state = {
    list: []
  }

  componentDidMount() {
    this.setState({
      list: todoService.getTodo()
    })
  }

  list = async () => {
    try {
      const list = await todoService.getTodo();
      return this.state.list.map((todo) => {
        const { title, body } = todo;
        return (
          <li>{title} - {body}</li>
        )
      })
    } catch (error) {
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.list}
        </ul>
      </div>
    );
  }
}

export default RenderList;