import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Task } from '../models/task-model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  jsonFile = 'http://localhost:3000/tasks';
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public getTasks(): Observable<Task[]> {
    const url = `${this.jsonFile}`;
    console.log('GET url=', url);
    return this.httpClient.get<Task[]>(this.jsonFile);
  }
  
  public addTasks(task: Task): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}`;
    console.log('POST url=', url);
    this.httpClient.post<Task>(url, task, { headers }).subscribe();
  }

  updTask(task: Task, taskNew: Task): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}/${task.Id}`;
    console.log('PUT url=', url);
    this.httpClient.put<Task>(url,taskNew, { headers }).subscribe();
  }

  delTaskById(idTask: number): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}/${idTask}`;
    console.log('DEL url=', url);
    this.httpClient.delete<Task>(url, { headers }).subscribe();
  }

  getTaskNextId(): Observable<number> {
    return this.httpClient.get<Task[]>(this.jsonFile)
    .pipe( map( 
      (tasks: Task[]) => { 
        const sortedTasks = tasks.sort((x,y) => x.Id > y.Id ? -1 : 1);
        console.log('',sortedTasks);
        return Number(sortedTasks[0].Id) + 1;
      }
    ));
  }

}
