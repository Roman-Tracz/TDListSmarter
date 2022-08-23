import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Task } from '../models/task-model';
import { TASKS } from '../models/task-mock';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  jsonFile = 'http://localhost:3000/tasks';

  result!: Task[];
  
  constructor(
    private httpClient: HttpClient
  ) { }
//*
  public getTasks(): Observable<Task[]> {
    const url = `${this.jsonFile}`;
    console.log('GET url=', url);
    return this.httpClient.get<Task[]>(this.jsonFile);
  }
//*/
/*
  public getTasks(): Observable<Task[]> {
    const url = `${this.jsonFile}`;
    console.log('GET url=', url);
    return this.httpClient.get<Task[]>(this.jsonFile);
  }
*/
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

  delTaskByIdBucket(idBucket: number): void {
    const url = `${this.jsonFile}`;
    console.log('GET url=', url);
    let TASKS = this.httpClient.get<Task[]>(this.jsonFile).pipe(res => this.result = res);
    console.log('TASK = ', Object.values(TASKS)) ;
    console.log('TASK = ', Object.entries(TASKS)) ;
    //TASKS.forEach((element, index)=>{
      //console.log('index = ', index, element.IdBucket, element.Id) ;
      //if(element.IdBucket == idBucket){
        //TASKS.splice(index,10);
      //}
    //});
  }

  getTasksMaxId(): number {
    //let bucketSorted = BUCKETS;
    let taskSorted1 = 
    this.httpClient.get<Task[]>(this.jsonFile).subscribe();
    //.subscribe(buckets => this.bucketSorted = buckets
    //  .sort((x,y) => x.Id < y.Id ? -1 : 1)
    //);
    //const sorted = bucketSorted.sort((a,b) => b.Id - a.Id);
    //console.log('this.bucketSorted[0].Id', this.bucketSorted);
    //return 1;//Number(this.bucketSorted[0].Id) + 1;

    let buckets = this.httpClient.get<Task[]>(this.jsonFile,{responseType: 'json'}).subscribe();

    console.log('this.taskSorted[0].Id', buckets);

    return 1;
  }

}
