import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Task } from '../models/task-model';
import { TASKS } from '../models/task-mock';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Observable<Task[]> {
    TASKS.sort((a,b) => a.Id - b.Id);
    const tasks = of(TASKS);
    return tasks;
  }

  addTasks(task: Task): void {
    const tasks = of(TASKS);
    TASKS.push(task);
  }

  updTask(task: Task, taskNew: Task): void {
    let index = TASKS.indexOf(task);
    TASKS[index] = taskNew;
  }

  delTaskById(idTask: number): void {
    TASKS.forEach((element, index)=>{
      if(element.Id === idTask){
        delete TASKS[index];
      }
   });
  }

  delTaskByIdBucket(idBucket: number): void {
    TASKS.forEach((element, index)=>{
      //console.log('index = ', index, element.IdBucket, element.Id) ;
      if(element.IdBucket == idBucket){
        TASKS.splice(index,10);
      }});
  }

  getTasksMaxId(): number {
    let taskSorted = TASKS;
    const sorted = taskSorted.sort((a,b) => b.Id - a.Id);
    return  sorted[0].Id + 1;
  }

}
