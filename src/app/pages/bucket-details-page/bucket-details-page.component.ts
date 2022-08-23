import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { ModalService } from '../../modal/bucket/modal.service';
import { Bucket } from '../../models/bucket-model';
//!!import { BucketService } from 'src/app/services/bucket-service';     /*in-memory-data-service*/
//
import { BucketService } from 'src/app/services/bucket-json.service';    /*bucket service*/ 
import { Task } from '../../models/task-model';
//!!import { TaskService } from 'src/app/services/task-service';     /*in-memory-data-service*/
//
import { TaskService } from 'src/app/services/task-json.service'; 
import { Router } from '@angular/router';
import  {MatTooltipModule} from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';


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

  bucketNameInput = "";
  bucketDesrInput = "";
  bucketColrInput = "";
  bucketMNOTInput = 0;

  taskTitleInput = "";
  taskDescrInput = "";
  taskPriorInput = "";
  taskStatsInput = "";
  taskAssigInput = "";

  errorMsg = "";

  taskMaxId = 0;

  isButtonEnabled!: boolean;
  isToolTipEnabled!: boolean;
  dateOptionsSelect: any;
  someSubscription: any;
  link: any;

  public data: { [key: string]: Object }[] = [
    { Class: 'asc-sort', Type: 'Sort A to Z', Id: '1' },
    { Class: 'dsc-sort', Type: 'Sort Z to A ', Id: '2' },
    { Class: 'filter', Type: 'Filter', Id: '3' },
    { Class: 'clear', Type: 'Clear', Id: '4' }];
// map the icon column to iconCSS field.
public fields: Object = { text: 'Type', iconCss: 'Class', value: 'Id' };
//set the placeholder to DropDownList input
public text: string = 'Select a format';                                   

  constructor(
    private activatedRoute : ActivatedRoute,
    private bucketService: BucketService,
    private taskService: TaskService,
    private modalService: ModalService,
    private router: Router,
    private matListModule: MatListModule

  ) {  } 

  ngOnDestroy() {
    if (this.someSubscription) {
      this.someSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.bucketIdG = Number(this.activatedRoute.snapshot.queryParams['id']);
    //this.taskMaxId = this.getTasksMaxId();
    this.getBucketById(this.bucketIdG);
    this.getTasks(this.bucketIdG);
    //!!this.taskCount = this.taskList.length;
    /*
    this.bucketNameInput = this.bucketList[0].Name;
    this.bucketDesrInput = this.bucketList[0].Description;
    this.bucketColrInput = this.bucketList[0].Color;
    this.bucketMNOTInput = this.bucketList[0].MaxNumOfTasks; 
    */
    this.taskPriorInput = 'Normal'
    this.taskStatsInput = 'To Do'

  }
  
	onSelectedP(value1:string): void {
    console.log('index', value1);
    this.taskPriorInput == value1;
  }

  onSelectedS(value2:string): void {
    console.log('index', value2);
    this.taskStatsInput == value2;
	}

  onSelectedP1(value3:string): void {
    console.log('index', value3);
    this.taskPriorInput == value3;
  }

  onSelectedS1(value4:string): void {
    console.log('index', value4);
    this.taskStatsInput == value4;
	}

  getBucketById(ident: number): void {
    //*
    this.bucketService.getBuckets()
      .subscribe(buckets => this.bucketList = buckets
       .filter(item =>
          item.Id === ident
    ));
    /*/
    /*
    this.bucketService.getBucketById(ident)
      .subscribe(buckets => this.bucketList = buckets
        //.filter(item =>
        //  item.Id === ident
    );
    //*/
/*
console.log('bucketList2',this.bucketList);
    if(this.bucketList.length == 0){
      this.link = '/bucketNotFound';
      this.router.navigateByUrl(this.link);
    }
*/  
  }


  getTasksMaxId(): number {
    let sorted = this.taskService.getTasksMaxId()
    return sorted+1;
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
      this.bucketService.updBuckets(this.bucketList[0], bucketNew);
      this.modalService.close(id);
    }

    this.getBucketById(this.bucketIdG);
    this.getTasks(this.bucketIdG);
  }


  delBucket(id: number): void {  
    console.log('id=',id);  
    this.bucketService.delBucketById(id);
    this.taskService.delTaskByIdBucket(id);
    this.closeModal('bucket-modal-yesNo2');
    this.link = '/bucketHasBeenDeleted';
    this.router.navigateByUrl(this.link);
  }


  getCheckBucketsName(bucketName: string): boolean {
    this.bucketService.getBuckets()
      .subscribe(buckets => this.bucketListN = buckets
        .filter(item =>
          item.Name === bucketName &&
          item.Id   !== this.bucketIdG
      ));

    if(this.bucketListN.length > 0){
      return true;
    }
    else{
      return false;
    }   
  }


  getTasks(idBucket: number): void {
 
    this.taskService.getTasks()
      .subscribe(
        tasks => this.taskList = tasks
         .filter(item =>
            item.IdBucket === idBucket
          )
          .sort((x,y) => x.Title < y.Title ? -1 : 1)        //sort by Priority asc
          .sort((x,y) => x.Priority < y.Priority ? -1 : 1)  //sort by Title asc
      );
      console.log('dfsdfs','fdsdsf');
  
  //  if(this.taskList.length >= this.bucketList[0].MaxNumOfTasks){
  //    this.isButtonEnabled = false;
  //    this.isToolTipEnabled = true;
  //  }
  //  else{
      this.isButtonEnabled = true;
      this.isToolTipEnabled = false;
  //  }

  }
  

  getTaskById(ident: number): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.taskListTmp = tasks
        .filter(item =>
          item.Id === ident
    ));
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
      this.taskMaxId++;
      this.modalService.close(id);
    }
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
      this.taskService.updTask(this.taskListTmp[0], taskNew);
      this.modalService.close(id);
    }

    this.getTasks(this.bucketIdG);
  }


  delTask(id: number): void {  
    this.taskService.delTaskById(id);
    //this.taskService.delTaskByIdBucket(this.bucketIdG);
    //this.taskService.delTaskByIdBucket(this.bucketIdG);
    //this.taskService.delTaskByIdBucket(this.bucketIdG);
    //this.taskService.delTaskByIdBucket(this.bucketIdG);
    this.getTasks(this.bucketIdG);
    this.taskCount = this.taskList.length;
    this.closeModal('task-modal-edit');
    this.closeModal('task-modal-yesNo2');
    //window.location.reload();
    //this.router.navigateByUrl('/bucketDetails', { skipLocationChange: true });
    //this.router.navigate(['app-statistics']);
    //this.router.navigateByUrl('/bucketDetails', { skipLocationChange: true }).then(() => {
    //this.router.navigate(['/bucketDetails']);});
  }

  editTaskModal(id: string, taskId: number) {

      this.getTaskById(taskId);  

      this.taskId         = this.taskListTmp[0].Id;
      this.taskTitleInput = this.taskListTmp[0].Title;
      this.taskDescrInput = this.taskListTmp[0].Description; 
      this.taskPriorInput = this.taskListTmp[0].Priority; 
      this.taskStatsInput = this.taskListTmp[0].State; 
      this.taskAssigInput = this.taskListTmp[0].Asignee;
      
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
    if(this.getCheckBucketsName(this.bucketNameInput) == true){
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

    if(this.taskListTmp[0].State == 'To Do'){
      this.taskStatsInput = 'In Progress';
    }
    if(this.taskListTmp[0].State == 'In Progress'){
      this.taskStatsInput = 'Done';
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

    this.taskService.updTask(this.taskListTmp[0], taskNew);
    this.getTasks(this.bucketIdG);
  };

}
