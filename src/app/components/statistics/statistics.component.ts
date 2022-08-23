import { Component, Input, OnInit } from '@angular/core';

import { Task } from '../../models/task-model';
import { TaskService } from 'src/app/services/task-service'; 

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  @Input() bucketIdP = 0;

  taskList!: Task[];

  taskCountToDo       = 0;
  taskCountInProgress = 0;
  taskCountDone       = 0;
  taskCountCancelled  = 0;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit( ): void {

    this.getTasksByType(this.bucketIdP,"To Do");
    this.taskCountToDo = this.taskList.length;

    this.getTasksByType(this.bucketIdP,"In Progress");
    this.taskCountInProgress = this.taskList.length;

    this.getTasksByType(this.bucketIdP,"Done");
    this.taskCountDone = this.taskList.length;

    this.getTasksByType(this.bucketIdP,"Cancelled");
    this.taskCountCancelled = this.taskList.length;

    //!!
    setTimeout(() => { this.ngOnInit() }, 1000 * 1)
  }

  getTasksByType(idBucket: number, state: string): void {
    if (idBucket == -1) {
      this.taskService.getTasks()
        .subscribe(tasks => this.taskList = tasks
          .filter(item =>
            item.State === state
          ));
    }
    else
    {
      this.taskService.getTasks()
      .subscribe(tasks => this.taskList = tasks
        .filter(item =>
          item.IdBucket === idBucket &&
          item.State === state
        ));
    }

  }
  
}
