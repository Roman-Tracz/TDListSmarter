import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task-model';
import { Bucket } from '../../models/bucket-model';
import { ModalService } from '../../modal/bucket/modal.service';
import { TaskService } from 'src/app/services/task-json.service';
import { Users } from '../../models/user-mock'
import { States } from '../../models/state-mock';
import { Priorities } from '../../models/priority-mock';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() bucketId = 0;
  @Input() bucketType = "";
  @Input() bucketColor = "";

  taskId = 0;
  taskList!: Task[];
  taskL!: Task;
  taskListTmp!: Task[];
  taskListTmp1!: Task[][];
  bucketList!: Bucket[];
  taskCount!: number;
  currentTimeInSeconds: any;
  priorities = Priorities;
  states = States;
  users = Users;
  taskTitleInput = '';
  taskDescrInput = ''; 
  taskPriorInput = ''; 
  taskStatsInput = ''; 
  taskAssigInput = '';
  isButtonEnabled!: boolean;
  isToolTipEnabled!: boolean;
  errorMsg = "";

  constructor(
    private taskService: TaskService,
    private modalService: ModalService,
  ) { }

  ngOnInit( ): void {

    this.getTasksByType(this.bucketId,this.bucketType);

  }


  async editTaskModal(id: string, taskId: number) {
    await this.getTaskById(taskId);
    this.modalService.open(id);
  }


  async getTaskById(ident: number) {
    return new Promise((resolve) => {
    this.taskService.getTasks()
      .subscribe(tasks => {this.taskListTmp = tasks
        .filter(item =>
          item.Id === ident)

          this.taskId         = this.taskListTmp[0].Id;
          this.taskTitleInput = this.taskListTmp[0].Title;
          this.taskDescrInput = this.taskListTmp[0].Description; 
          this.taskPriorInput = this.taskListTmp[0].Priority; 
          this.taskStatsInput = this.taskListTmp[0].State; 
          this.taskAssigInput = this.taskListTmp[0].Asignee;

          resolve(this.taskListTmp);
        });
    });
  }
  

  async raiseStatus(idTask: number): Promise<void>{
    await this.getTaskById(idTask);  

    if(this.taskListTmp[0].State == States[0]){
      this.taskStatsInput = States[1];
    }
    if(this.taskListTmp[0].State == States[1]){
      this.taskStatsInput = States[2];
    }

    const taskNew: Task = { 
      Id            : this.taskListTmp[0].Id,
      IdBucket      : this.taskListTmp[0].IdBucket,
      Title         : this.taskListTmp[0].Title, 
      Description   : this.taskListTmp[0].Description,
      Priority      : this.taskListTmp[0].Priority,
      State         : this.taskStatsInput,
      Asignee       : this.taskListTmp[0].Asignee
    }

    this.taskService.updateTask(this.taskListTmp[0], taskNew);
    this.getTasks(this.bucketId);
    window.location.reload();
  };


  getTasks(idBucket: number): void {
    this.taskService.getTasks()
      .subscribe(
        tasks => { 
          this.taskList = tasks
            .filter(item =>
              item.IdBucket === idBucket
            )
            .sort((x,y) => x.Title < y.Title ? -1 : 1)        //sort by Priority asc
            .sort((x,y) => x.Priority < y.Priority ? -1 : 1)  //sort by Title asc
       
            if(this.taskList.length >= this.bucketList[0].MaxNumOfTasks){
              this.isButtonEnabled = false;
              this.isToolTipEnabled = true;
            }
            else{
              this.isButtonEnabled = true;
              this.isToolTipEnabled = false;
            }
        });
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


  closeModal(id: string) {
    this.modalService.close(id);
  }


  updTask(id: string): void {  
    const taskNew: Task = { 
      Id            : this.taskId, 
      IdBucket      : this.bucketId,
      Title         : this.taskTitleInput, 
      Description   : this.taskDescrInput, 
      Priority      : this.taskPriorInput, 
      State         : this.taskStatsInput, 
      Asignee       : this.taskAssigInput
    }

    if(this.validateTask() == true) {
      this.taskService.updateTask(this.taskListTmp[0], taskNew);
      this.modalService.close(id);
    }

    this.getTasks(this.bucketId);
    window.location.reload();
  }


  validateTask(): boolean {   
    if(this.taskTitleInput == null || this.taskTitleInput == ''){
      this.errorMsg = "Please set Title.";
      this.openModal('bucket-modal-message');
      return false;
    }
    if(this.taskTitleInput.length >= 100){
      this.errorMsg = "Title cannot be longer than 100 chars.";
      this.openModal('bucket-modal-message');
      return false;
    }

    if(this.taskDescrInput.length >= 500){
      this.errorMsg = "Description cannot be longer than 500 chars.";
      this.openModal('bucket-modal-message');
      return false;
    }

    if(this.taskPriorInput == null || this.taskPriorInput == ''){
      this.errorMsg = "Please set Priority.";
      this.openModal('bucket-modal-message');
      return false;
    }
  
    if(this.taskStatsInput == null || this.taskStatsInput == ""){
      this.errorMsg = "Please set State.";
      this.openModal('bucket-modal-message');
      return false;
    }

    if(this.taskAssigInput.length >= 100){
      this.errorMsg = "Assignee cannot be longer than 100 chars.";
      this.openModal('bucket-modal-message');
      return false;
    }

    return true;
  }


  delTask(id: number): void {  
    this.taskService.deleteTaskById(id);
    this.getTasks(this.bucketId);
    this.taskCount = this.taskList.length;
    this.closeModal('task-modal-edit1');
    this.closeModal('task-modal-yesNo1');
    window.location.reload();
  }


}
