import { Component, OnInit } from '@angular/core';
import { eventNames } from 'process';
import { Todo } from '../../interfaces/Todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;

  constructor() { }

  ngOnInit(): void {
    this.filter = 'all';
    this.beforeEditCache = '';
    this.idForTodo = 4;
    this.todoTitle = '';
    this.todos = [
      {
        'id': 1,
        'title': 'Learn Angular',
        'completed': false,
        'editing': false,
      },
      {
        'id': 2,
        'title': 'Take over the world',
        'completed': false,
        'editing': false,
      },
      {
        'id': 3,
        'title': 'Go to Mars',
        'completed': false,
        'editing': false,
      },
    ];
  }

  addTodo(): void {
    if(this.todoTitle.trim().length == 0){
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    })

    this.todoTitle = '';
    this.idForTodo ++;

  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if(todo.title.trim().length == 0){
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id != id);
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkAllTodos(): void{
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked);
  }

  todosFiltered(): Todo[]{
    if(this.filter == 'all'){
      return this.todos
    }
    else if(this.filter == 'active'){
      return this.todos.filter(todo => !todo.completed)
    }
    else if(this.filter == 'completed'){
      return this.todos.filter(todo => todo.completed)
    }
    return this.todos
  }

}

