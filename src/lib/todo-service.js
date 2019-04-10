import axios from 'axios';

class TodoService {
  constructor() {
    this.todo = axios.create({
      baseURL: 'http://localhost:4000/api/v1',
      withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }

  async getAllTodos(){
    try {
      const AllTodos = await this.todo.get('/todos')
      return AllTodos.data;
    } catch (error) {
      return error;
    }
  }

  async getTodo(id){
    try {
      const Todo = await this.todo.get(`/todos/${id}`)
      return Todo.data;
    } catch (error) {
      return error;
    }
  }

  async createTodo(todo){
    try {
      const {title, body} = todo;
      const newTodo = await this.todo.post('/todos',{title,body})
      return newTodo.data;
    } catch (error) {
      return error;
    }
  }

  async updateTodo(id, todo){
    try {
      const updateTodo = await this.todo.put(`/todos/${id}`,{todo})
      return updateTodo.data;
    } catch (error) {
      return error;
    }
  }

  async deleteTodo(id){
    try {
      const deleteTodo = await this.todo.delete(`/todos/${id}`)
      return deleteTodo.data;
    } catch (error) {
      return error;
    }
  }
}

const todoService = new TodoService();

export default todoService;