import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task-model';
import { Bucket } from '../../models/bucket-model';
import { ModalService } from '../../modal/bucket/modal.service';
import { delay, forkJoin, map, Observable, Subject, switchMap } from 'rxjs';
import { Colores } from '../../models/color-mock';
/*in-memory-data-service*/
//import { BucketService } from 'src/app/services/bucket-service';     
//import { TaskService } from 'src/app/services/task-service';
/*json-service*/
import { BucketService } from 'src/app/services/bucket-json.service';  
import { TaskService } from 'src/app/services/task-json.service';
//import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})


export class BucketListComponent implements OnInit {

  bucketList!: Bucket[];
  bucketListId!: Bucket[];
  bucketListN!: Bucket[];
  taskList!: Task[];
  bucketId = 0;
  colores = Colores;
  bucketName = "";
  bucketNameInput = "";
  bucketDesrInput = "";
  bucketColrInput = Colores[0];
  bucketMNOTInput = 15;
  errorMsg = "";
  bucketMaxId!: number;
  mealColumnsNum = [0,1,2,3];
  isButtonEnabled!: boolean;
  isToolTipEnabled!: boolean;
  bucketsNameIsUnique!: boolean;
  td = [0,0,0,0,0,0,0,0,0,0];

   
  constructor(

    private bucketService: BucketService,
    private taskService: TaskService,
    private modalService: ModalService
    //private spinnerService: NgxSpinnerService

  ) {  
    //this.typeSelected = 'ball-fussion';
   }


  ngOnInit(): void { 
    
    this.getBucketsNextId();
    this.getBuckets();
    
  }
  /*
  public showSpinner(): void {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 5000); // 5 seconds;
  }
  */

  onSelectedS1(value:string): void {
    this.bucketColrInput == value;
	}


  getBuckets(): void {
    this.bucketService.getBuckets()
      .subscribe(buckets => { 
        this.bucketList = buckets.sort((x,y) => x.Id < y.Id ? -1 : 1)

      for (let i = 0; i<= this.bucketList.length-1; i++){
        this.getTasksByType(this.bucketList[i].Id,'To Do');
      }
      
      if(this.bucketList.length >= 10 ){
        this.isButtonEnabled = false;
        this.isToolTipEnabled = true;
      }
      else{
        this.isButtonEnabled = true;
        this.isToolTipEnabled = false;
      }
    });
  }


  getBucketById(idBucket: number): void {
    this.bucketService.getBuckets()
      .subscribe(buckets => {
        this.bucketListId = buckets.filter(item =>
        item.Id === idBucket)

        this.bucketName = this.bucketListId[0].Name;
      }
    );
  }


  getBucketsNextId(): void {
    this.bucketService.getBucketsNextId().subscribe(b => this.bucketMaxId = b);
  }


  async addBucket(id: string): Promise<void> {  
    const bucketNew: Bucket = { 
      Id            : this.bucketMaxId,
      Name          : this.bucketNameInput, 
      Description   : this.bucketDesrInput, 
      Color         : this.bucketColrInput, 
      MaxNumOfTasks : this.bucketMNOTInput, 
    }

    if(await this.validateBucket() == true) {
      this.bucketService.addBucket(bucketNew);
      this.modalService.close(id);
    }

    this.getBuckets();
  }


  delBucket(id: number): void {  
  console.log('','delBucket');
      this.delTaskByIdBucket(id);
      this.getBuckets();
      this.closeModal('bucket-modal-yesNo-list');
      //window.location.reload();
  }


  checkIfBucketsNameIsUnique(bucketName: string)                                          
  {
    return new Promise((resolve) => { 
      this.bucketService.getBuckets()
        .subscribe(buckets => {this.bucketListN = buckets
          .filter(item =>
            item.Name === bucketName)
            if(this.bucketListN.length == 0){
              this.bucketsNameIsUnique = true;
            }
            else{
              this.bucketsNameIsUnique = false;
            } 
            resolve(this.bucketsNameIsUnique);
        })
    });
  }


  openModal(id: string) {
    this.modalService.open(id);
  }

  
  openModalY(id: string, id_bucket: number) {
    this.bucketId = id_bucket;
    this.getBucketById(id_bucket);
    this.modalService.open(id);
  }


  closeModal(id: string) {
    this.modalService.close(id);
  }


  async validateBucket(): Promise<boolean> {   
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
    await this.checkIfBucketsNameIsUnique(this.bucketNameInput)
    if(this.bucketsNameIsUnique == false){
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


  getTasksByType(Id_Bucket: number, state: string): void { 
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.taskList = tasks
          .filter(item =>
            item.IdBucket === Id_Bucket && 
            item.State === state)
          
            this.td[Id_Bucket] = this.taskList.length;
        });
  }
  

  async delTaskByIdBucket(idBucket: number) {
    console.log('','delTaskByIdBucket');
    return new Promise(async (resolve) => { 

    this.taskService.getTasks()
      .subscribe( async tasks => {
        this.taskList = tasks
         .filter(item =>
            item.IdBucket === idBucket)

            for (let i = 0; i<= this.taskList.length-1; i++){
              forkJoin ({i: this.taskService.delTaskById1(this.taskList[i].Id)}).subscribe();
              //!!await this.delTaskById(this.taskList[i].Id);
              delay(9000);
            }

            resolve(this.taskList.length);
          });
    });
  }

  async delTaskById(id: number) {
    return new Promise((resolve) => { 
      this.taskService.delTaskById1(id).subscribe( tasks => { this.taskList = tasks
      resolve(this.taskList.length)
      })
    })
    //!!await this.taskService.delTaskById(id)
  }

}
