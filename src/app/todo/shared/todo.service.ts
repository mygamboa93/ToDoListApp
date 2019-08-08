import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

@Injectable()
export class TodoService {
  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  //return the todo list
  getToDoList() {
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;
  }

  //add an item to the todolist
  addTitle(title: string) {
    this.toDoList.push({
      title: title,
      isChecked: false
    });
  }

  //check or uncheck the todo list item
  checkOrUnCheckTitle($key: string, flag: boolean) {
    this.toDoList.update($key, { isChecked: flag });
  }

  //remove the todo list item
  removeTitle($key: string) {
    this.toDoList.remove($key);
  }

}
