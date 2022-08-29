import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../modal/bucket/modal.service';
import { Bucket } from '../../models/bucket-model';
import { Task } from '../../models/task-model';
import { Router } from '@angular/router';

import { Users } from '../../models/user-mock'
import { Priorities } from '../../models/priority-mock';
import { States } from '../../models/state-mock';
import { Colores } from '../../models/color-mock';

/*in-memory-data-service*/
//!!import { BucketService } from 'src/app/services/bucket-service';
//!!import { TaskService } from 'src/app/services/task-service';
/*bucket service*/
import { BucketService } from 'src/app/services/bucket-json.service';
import { TaskService } from 'src/app/services/task-json.service';     
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-bucket-details-page',
  templateUrl: './bucket-details-page.component.html',
  styleUrls: [ './bucket-details-page.component.css']
})


export class BucketDetailsPage implements OnInit {

  bucketIdG = 0;
  taskId = 0;
  taskName = "";
  bucketList!: Bucket[];
  bucketListN!: Bucket[];
  taskCount!: number;
  bucketNew!: Bucket;
  taskList!: Task[];
  taskListTmp!: Task[];
  users = Users;
  priorities = Priorities;
  states = States;
  colores = Colores;
  bucketNameInput = "";
  bucketDesrInput = "";
  bucketColrInput = "";
  bucketMNOTInput = 0;
  taskTitleInput = "";
  taskDescrInput = "";
  taskPriorInput = Priorities[0];
  taskStatsInput = States[0];
  taskAssigInput = "";
  errorMsg = "";
  taskMaxId = 0;
  isButtonEnabled!: boolean;
  isToolTipEnabled!: boolean;
  link: any;
  bucketsNameIsUnique!: boolean;

  constructor(
    private activatedRoute : ActivatedRoute,
    private bucketService: BucketService,
    private taskService: TaskService,
    private modalService: ModalService,
    private router: Router,

  ) {  } 

  ngOnInit(): void {
    this.bucketIdG = Number(this.activatedRoute.snapshot.queryParams['id']);
    this.getTaskNextId();
    this.getBucketById(this.bucketIdG);
    this.getTasks(this.bucketIdG);
  }
  
	onSelectedP(value:string): void {
    this.taskPriorInput == value;
  }

  onSelectedS(value:string): void {
    this.taskStatsInput == value;
	}

  onSelectedP1(value:string): void {
    this.taskPriorInput == value;
  }

  onSelectedS1(value:string): void {
    this.taskStatsInput == value;
	}

  getBucketById(ident: number): void {
    this.bucketService.getBuckets()
      .subscribe(res => {
        this.bucketList = res
          .filter(item =>
            item.Id === ident)

        if(this.bucketList.length == 0){
          this.link = '/bucketNotFound';
          this.router.navigateByUrl(this.link);
        }

        this.bucketNameInput = this.bucketList[0].Name;
        this.bucketDesrInput = this.bucketList[0].Description;
        this.bucketColrInput = this.bucketList[0].Color;
        this.bucketMNOTInput = this.bucketList[0].MaxNumOfTasks; 
      });
  }


  getTaskNextId(): void {
    this.taskService.getTaskNextId().subscribe(b => this.taskMaxId = b);
  }


   updBucket(id: string): void {  
    const bucketNew: Bucket = { 
      Id            : this.bucketIdG, 
      Name          : this.bucketNameInput, 
      Description   : this.bucketDesrInput, 
      Color         : this.bucketColrInput, 
      MaxNumOfTasks : this.bucketMNOTInput
    }

    if(this.validateBucket() == true) {
      this.bucketService.updateBuckets(this.bucketList[0], bucketNew);
      this.modalService.close(id);
    }

    this.getBucketById(this.bucketIdG);
    this.getTasks(this.bucketIdG);
  }


  delBucket(idBucket: number): void {   
    this.delTaskByIdBucket(idBucket);
    this.bucketService.deleteBucketById(idBucket);
    this.closeModal('bucket-modal-yesNo');
    this.link = '/bucketHasBeenDeleted';
    this.router.navigateByUrl(this.link);
  }

   delTaskByIdBucket(idBucket: number): void {
    this.taskService.getTasks()
      .subscribe(  tasks => {
        this.taskList = tasks
         .filter(item =>
            item.IdBucket === idBucket)
      
            for (let i = 0; i<= this.taskList.length-1; i++){
              forkJoin ({i: this.taskService.deleteTaskByIdReturnDeleted(this.taskList[i].Id)}).subscribe();
            }
    });

  }

   getCheckBucketsName(bucketName: string): void {
    this.bucketService.getBuckets()
      .subscribe(buckets => {
          this.bucketListN = buckets
          .filter(item =>
            item.Name === bucketName &&
            item.Id   !== this.bucketIdG
          )
      
      if(this.bucketListN.length > 0){
        this.bucketsNameIsUnique = true;
      }
      else{
        this.bucketsNameIsUnique = false;
      }
    });     
  }


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
  

  getTaskById(ident: number): void {
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
        });
  }


  addTask(id: string): void {  
    const taskNew: Task = { 
      Id            : this.taskMaxId,
      IdBucket      : this.bucketIdG, 
      Title         : this.taskTitleInput, 
      Description   : this.taskDescrInput, 
      Priority      : this.taskPriorInput, 
      State         : this.taskStatsInput, 
      Asignee       : this.taskAssigInput
    }

    if(this.validateTask() == true) {
      this.taskService.addTasks(taskNew);
      this.getTasks(this.bucketIdG);
      this.taskCount = this.taskList.length;
      this.modalService.close(id);
    }

    window.location.reload();
  }

  updTask(id: string): void {  
    const taskNew: Task = { 
      Id            : this.taskId, 
      IdBucket      : this.bucketIdG,
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

    this.getTasks(this.bucketIdG);
    window.location.reload();
  }


  delTask(id: number): void {  
    this.taskService.deleteTaskById(id);
    this.getTasks(this.bucketIdG);
    this.taskCount = this.taskList.length;
    this.closeModal('task-modal-edit');
    this.closeModal('task-modal-yesNo');
    window.location.reload();
  }

  editTaskModal(id: string, taskId: number) {
      this.getTaskById(taskId);     
      this.modalService.open(id);
  }
  

  openModal(id: string) {
    this.modalService.open(id);
  }


  saveModal(id: string) {
    this.bucketService.addBucket(this.bucketNew);
    this.modalService.close(id);
  }


  closeModal(id: string) {
    this.modalService.close(id);
  }


   validateBucket(): boolean {   
    if(this.bucketNameInput == null || this.bucketNameInput == ''){
      this.errorMsg = "Please set Name.";
      this.openModal('bucket-modal-message');
      return false;
    }
    if(this.bucketNameInput.length >= 100){
      this.errorMsg = "Name cannot be longer than 100 chars.";
      this.openModal('bucket-modal-message');
      return false;
    }
     this.getCheckBucketsName(this.bucketNameInput);
    if(this.bucketsNameIsUnique == false){
      this.errorMsg = "Name must be unique.";
      this.openModal('bucket-modal-message');
      return false;
    } 

    if(this.bucketDesrInput.length >= 500){
      this.errorMsg = "Name cannot be longer than 500 chars.";
      this.openModal('bucket-modal-message');
      return false;
    }

    if(this.bucketColrInput == null || this.bucketColrInput == ''){
      this.errorMsg = "Please set Color.";
      this.openModal('bucket-modal-message');
      return false;
    } 
  
    if(this.bucketMNOTInput == null || (this.bucketMNOTInput).toString() == ""){
      this.errorMsg = "Please set Maximum number of tasks.";
      this.openModal('bucket-modal-message');
      return false;
    }
    if(this.bucketMNOTInput <= 0 || this.bucketMNOTInput > 40){
      this.errorMsg = "Please set Maximum number of tasks between 1-40.";
      this.openModal('bucket-modal-message');
      return false;
    }

    return true;
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

  getTasksByType(idBucketK: number, state: string): Task[] {
    if(idBucketK == -1){
      this.taskService.getTasks()
        .subscribe(tasks => this.taskListTmp = tasks
          .filter(item =>
            item.State === state
        ));
       }
    else{
      this.taskService.getTasks()
        .subscribe(tasks => this.taskListTmp = tasks
          .filter(item =>
            item.State === state &&
            item.IdBucket === idBucketK
        ));
      }

      return this.taskListTmp;
  }

   raiseStatus(idTask: number): void{
     this.getTaskById(idTask);  

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
    this.getTasks(this.bucketIdG);
    window.location.reload();
  };

}
