import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task-model';
import { Bucket } from '../../models/bucket-model';
//!!import { BucketService } from 'src/app/services/bucket-service';     /*in-memory-data-service*/
//
import { BucketService } from 'src/app/services/bucket-json.service';  /*bucket service*/
import { TaskService } from 'src/app/services/task-service';
import { ModalService } from '../../modal/bucket/modal.service';
import { BucketResponse } from 'src/app/models/bucket-response';


@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})


export class BucketListComponent implements OnInit {

  bucketList!: Bucket[];
  //bucketList!: BucketResponse;
  bucketListN!: Bucket[];
  bucketListI!: Bucket[];
  bucketListS!: Bucket[];
  bucketCount!: number;
  bucketNew!: Bucket;

  taskList!: Task[];
  taskCount!: number;

  bucketId = 0;
  bucketName = "";
  bucketNameInput = "";
  bucketDesrInput = "";
  bucketColrInput = "";
  bucketMNOTInput = 15;

  errorMsg = "";

  bucketsMaxId!: number;

  mealColumnsNum = [0,1,2,3];

  isButtonEnabled!: boolean;
  isToolTipEnabled!: boolean;
/*
  public listItems: Array<{ text: string, value: number, status: string }> = [
    { text: 'Small', value: 1, status: "pending" },
    { text: 'Medium', value: 2, status: "closed" },
    { text: 'Large', value: 3, status: "open" }
];
*/
public selectedValue = 2;

  constructor(

    private bucketService: BucketService,
    private taskService: TaskService,
    private modalService: ModalService,
    
  ) {
    //this.getBuckets().subscribe(data => {
      //console.log(data);
    //});
    //this.getBuckets();
   }


  ngOnInit(): void { 
    
    this.bucketsMaxId = this.getBucketsMaxId();
    this.getBuckets();
    this.bucketCount = this.bucketList.length;
    this.getTasksByType(this.bucketId, "To Do");
    this.taskCount = this.taskList.length;
    this.bucketColrInput = 'Brown';
    this.bucketMNOTInput = 15;

  }
  
  onSelectedS1(value4:string): void {
    console.log('index', value4);
    this.bucketColrInput == value4;
	}


  getBuckets(): void {
    this.bucketService.getBuckets()
      .subscribe(buckets => this.bucketList = buckets
        .sort((x,y) => x.Id < y.Id ? -1 : 1)
      );
console.log('bucketList1',this.bucketList);
    if(this.bucketList.length >= 10 ){
      this.isButtonEnabled = false;
      this.isToolTipEnabled = true;
    }
    else{
      this.isButtonEnabled = true;
      this.isToolTipEnabled = false;
    }
  }


  getBucketById(id: number): void {
    this.bucketService.getBuckets()
    .subscribe(buckets => this.bucketListI = buckets.filter(item =>
      item.Id === id
    ));
    console.log('bucketList',this.bucketListI);
  }


  getBucketsMaxId(): number {
    //let sorted = this.bucketService.getBucketsMaxId();
    //return sorted + 1;
    return this.bucketService.getBucketsMaxId();
  }


  addBucket(id: string): void {  
    const bucketNew: Bucket = { 
      Id            : this.bucketsMaxId,
      Name          : this.bucketNameInput, 
      Description   : this.bucketDesrInput, 
      Color         : this.bucketColrInput, 
      MaxNumOfTasks : this.bucketMNOTInput, 
    }

    if(this.validateBucket() == true) {
      this.bucketService.addBucket(bucketNew);
      this.bucketCount++;
      this.bucketsMaxId++;
      this.modalService.close(id);
    }

    this.getBuckets();
  }


  delBucket(id: number): void {  
      this.bucketService.delBucketById(id);
      //!!this.taskService.delTaskByIdBucket(id);
      this.bucketCount--;
      this.getBuckets();
      this.closeModal('bucket-modal-yesNo1');
  }

  
  checkIfBucketsNameIsUnique(bucketName: string): boolean {
    this.bucketService.getBuckets()
      .subscribe(buckets => this.bucketListN = buckets
        .filter(item =>
          item.Name === bucketName
      ));

    if(this.bucketListN.length > 0){
      return true;
    }
    else{
      return false;
    }   
  }


  openModal(id: string) {
    this.modalService.open(id);
  }

  
  openModalY(id: string, id_bucket: number) {
    this.bucketId = id_bucket;
    this.getBucketById(id_bucket);
    this.bucketName = this.bucketListI[0].Name;
    this.modalService.open(id);
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
    if(this.checkIfBucketsNameIsUnique(this.bucketNameInput) == true){
      this.errorMsg = "Name must be unique.";
      this.openModal('bucket-modal-message');
      return false;
    } 

    if(this.bucketDesrInput.length >= 500){
      this.errorMsg = "Description cannot be longer than 500 chars.";
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


  getTasksByType(Id_Bucket: number, source_id: string): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.taskList = tasks
        .filter(item =>
          item.IdBucket === Id_Bucket && 
          item.State === source_id
        ));

  }

}
