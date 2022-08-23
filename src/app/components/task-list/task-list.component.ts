import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task-model';
//!!import { TaskService } from 'src/app/services/task-service';
import { TaskService } from 'src/app/services/task-json.service';    /*bucket service*/
import { ModalService } from '../../modal/bucket/modal.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() bucketIdP = 0;
  @Input() bucketType = "";

  taskList!: Task[];
  taskCount!: number;
  currentTimeInSeconds: any;

  taskTitleInput = '';
  taskDescrInput = ''; 
  taskPriorInput = ''; 
  taskStatsInput = ''; 
  taskAssigInput = '';

  constructor(
    private taskService: TaskService,
    private modalService: ModalService,
  ) { }

  ngOnInit( ): void {

    this.getTasksByType(this.bucketIdP,this.bucketType);
    this.taskCount = this.taskList.length;

    this.currentTimeInSeconds=Math.floor(Date.now()/1000);

  }

  getTasksByType(idBucketK: number, state: string): void {
    if(idBucketK == -1){
      this.taskService.getTasks()
        .subscribe(tasks => this.taskList = tasks
          .filter(item =>
            item.State === state
        ));
       }
    else{
      this.taskService.getTasks()
        .subscribe(tasks => this.taskList = tasks
          .filter(item =>
            item.State === state &&
            item.IdBucket === idBucketK
        ));
      }
  }

  openModal(id: string) {
    this.taskTitleInput = this.taskList[0].Title;
    this.taskDescrInput = this.taskList[0].Description; 
    this.taskPriorInput = this.taskList[0].Priority; 
    this.taskStatsInput = this.taskList[0].State; 
    this.taskAssigInput = this.taskList[0].Asignee;

    this.modalService.open(id);
  }

}
