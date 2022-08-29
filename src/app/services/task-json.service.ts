import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Task } from '../models/task-model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  jsonFile = environment.tasksJsonLink;
  
  constructor(
    private httpClient: HttpClient
  ) { }

  getTasks(): Observable<Task[]> {
    const url = `${this.jsonFile}`;
    return this.httpClient.get<Task[]>(this.jsonFile);
  }

  getTaskById(taskId: number): Observable<Task[]> {
    const url = `${this.jsonFile}/${taskId}`;
    return this.httpClient.get<Task[]>(url);
  }
  
  addTasks(task: Task): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}`;
    this.httpClient.post<Task>(url, task, { headers }).subscribe();
  }

  updateTask(task: Task, taskNew: Task): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}/${task.Id}`;
    this.httpClient.put<Task>(url,taskNew, { headers }).subscribe();
  }

  deleteTaskById(idTask: number): void {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}/${idTask}`;
    this.httpClient.delete<Task>(url, { headers }).subscribe();
  }

  deleteTaskByIdReturnDeleted(idTask: number): Observable<Task[]> {
    const headers = { 'Content-Type': 'application/json' };
    const url = `${this.jsonFile}/${idTask}`;
    let deleted = this.httpClient.get<Task[]>(url);
    this.httpClient.delete<Task>(url, { headers }).subscribe();
    console.log('del = ', url);
    return deleted;
  }

  getTaskNextId(): Observable<number> {
    return this.httpClient.get<Task[]>(this.jsonFile)
    .pipe( map( 
      (tasks: Task[]) => { 
        const sortedTasks = tasks.sort((x,y) => x.Id > y.Id ? -1 : 1);
        return Number(sortedTasks[0].Id) + 1;
      }
    ));
  }

}
