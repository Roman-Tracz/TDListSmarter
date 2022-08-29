import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task-model';
import { States } from '../../models/state-mock';
import { TaskService } from 'src/app/services/task-json.service';

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
  states = States;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit( ): void {

    this.getTasksByType(this.bucketIdP,States[0]); //"To Do"
    this.getTasksByType(this.bucketIdP,States[1]); //"In Progress"
    this.getTasksByType(this.bucketIdP,States[2]); //"Done"
    this.getTasksByType(this.bucketIdP,States[3]); //"Cancelled"
    
  }

  getTasksByType(idBucket: number, state: string): void {
    if (idBucket == -1) {
      this.taskService.getTasks()
        .subscribe(tasks => {
          this.taskList = tasks
            .filter(item =>
              item.State === state)
            if(state == States[0]){
              this.taskCountToDo = this.taskList.length;
            }
            else if(state == States[1]){
              this.taskCountInProgress = this.taskList.length;
            }
            else if(state == States[2]){
              this.taskCountDone = this.taskList.length;
            }
            else if(state == States[3]){
              this.taskCountCancelled = this.taskList.length;
            }
          });
    }
    else
    {
      this.taskService.getTasks()
      .subscribe(tasks => 
        {this.taskList = tasks
          .filter(item =>
            item.IdBucket === idBucket &&
            item.State === state);
            if(state == States[0]){
              this.taskCountToDo = this.taskList.length;
            }
            else if(state == States[1]){
              this.taskCountInProgress = this.taskList.length;
            }
            else if(state == States[2]){
              this.taskCountDone = this.taskList.length;
            }
            else if(state == States[3]){
              this.taskCountCancelled = this.taskList.length;
            }
          });
    }
  }

}
