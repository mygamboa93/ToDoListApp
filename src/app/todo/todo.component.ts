import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [],
  providers: [TodoService]
})

export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.toDoListArray.push(x);
        })
        //sort array isChecked false  -> true
        //this.toDoListArray.sort((a, b) => {
        //  return a.isChecked - b.isChecked;
        //})
      });
  }

  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string, isChecked) {
    this.toDoService.checkOrUnCheckTitle($key, !isChecked);
  }

  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }



  //show all completed to do items
  //(click)="alterCheck(item.$key,item.isChecked)">
  displayCompleted() {
    this.toDoService.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          //this.toDoListArray.push(x);
          //this.alterCheck(element.key, x);
          this.toDoListArray.push(x);
        })
        //sort array isChecked true  -> false
        this.toDoListArray.sort((a, b) => {
          return b.isChecked - a.isChecked;
        })
      });
    location.reload;
  }



  //show all incomplete to do items
  displayIncomplete() {
    this.toDoService.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          //this.toDoListArray.push(x);
          //this.alterCheck(element.key, x);
          this.toDoListArray.push(x);
          //this.toDoListArray.forEach(myFunction);
        })
        //function myFunction(item, index) {
        // // document.getElementById("demo").innerHTML += index + ":" + item + "<br>";
        //  return this.toDoListArray.item.index.isChecked;
        //}
        //sort array isChecked false  -> true
        this.toDoListArray.sort((a, b) => {
          return a.isChecked-b.isChecked;
        })
      });
    location.reload;
  }



  //delete all to do items
  deleteSelected() {
    this.toDoService.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.onDelete(element.key);
        })
      });
    location.reload();
  }

  //display all to do list items
  displayAllToDoListItems() {
    this.toDoService.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.toDoListArray.push(x);
        })
        //sort array isChecked false  -> true
        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        })
      });
    location.reload();
  }



}
