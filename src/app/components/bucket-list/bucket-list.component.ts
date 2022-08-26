import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task-model';
import { Bucket } from '../../models/bucket-model';
import { ModalService } from '../../modal/bucket/modal.service';
import { delay, forkJoin, Subject, switchMap } from 'rxjs';
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
    private modalService: ModalService,
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
console.log('id = ',id);
    if(await this.validateBucket() == true) {
      this.bucketService.addBucket(bucketNew);
      this.modalService.close(id);
    }

    this.getBuckets();
    //window.location.reload();
  }


  delBucket(id: number): void {  
      this.bucketService.delBucketById(id);
      this.delTaskByIdBucket(id);
      this.getBuckets();
      this.closeModal('bucket-modal-yesNo-list');
      window.location.reload();
  }

  
 checkIfBucketsNameIsUnique(bucketName: string): void {
  /*
   this.bucketService.getBuckets()
      .subscribe(buckets => {this.bucketListN = buckets
        .filter(item =>
          item.Name === bucketName)
          console.log('this.bucketsNameIsUnique__ = ',this.bucketsNameIsUnique);
      if(this.bucketListN.length == 0){
        this.bucketsNameIsUnique = true;
      }
      else{
        this.bucketsNameIsUnique = false;
      } 
    });
//*/
/*
this.taskService.getTasks()
.subscribe( async tasks => {
  this.taskList = tasks
   .filter(item =>
      item.IdBucket === 1)
    
            forkJoin ({a: this.bucketService.getBuckets()
              .subscribe(buckets => {this.bucketListN = buckets
                .filter(item =>
                  item.Name === bucketName);
                })
              }).subscribe();
});    
*/
console.log('buckcheckIfBucketsNameIsUniqueetListN=','checkIfBucketsNameIsUnique');
console.log('bucketName=',bucketName);
//this.bucketService.getBuckets() {
 //this.bucketService.getBuckets().pipe( 
   //   switchMap( s => { 
//console.log('s=',s);
        //return 
        this.bucketService.getBucketById(1).pipe(
          
        )
        .subscribe(buckets => this.bucketListN = buckets
        .filter(item =>
            item.Name === bucketName)//) } )  
        )
        //console.log('buckets=',buckets);
       
  //)//!!.subscribe(buckets => this.bucketListN = buckets
  //.subscribe(buckets => this.bucketListN = buckets
    //console.log('buckets=',buckets);
    //.filter(item =>
    //  item.Name === bucketName);
      
    //  console.log('buckets=',buckets);
    //  console.log('this.bucketsNameIsUnique__1 = ',this.bucketsNameIsUnique);
    /*
    this.route.params
    .switchMap((params: Params) => this.service.getHero(+params['id']))
    .subscribe((hero: Hero) => this.hero = hero);
      console.log('buckets=',this.bucketListN);
      */
      /*
      if(this.bucketListN.length == 0){
        this.bucketsNameIsUnique = true;
      }
      else{
        this.bucketsNameIsUnique = false;
      } 
      */
    
    //);

    //console.log('buckets=',this.bucketListN);
    //console.log('this.bucketsNameIsUnique__2 = ',this.bucketsNameIsUnique);
    //console.log('bucketListN=',this.bucketListN);
    //}
  /*
     this.taskService.getTasks()
      .subscribe( async tasks => {
        this.taskList = tasks
         .filter(item =>
            item.IdBucket === idBucket)
      
            for (let i = 0; i<= this.taskList.length-1; i++){
              forkJoin ({a: this.taskService.delTaskById1(this.taskList[i].Id)}).subscribe();
            }
    });
  */

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
console.log('this.bucketsNameIsUnique1 = ',this.bucketsNameIsUnique);
    await this.checkIfBucketsNameIsUnique(this.bucketNameInput);
console.log('this.bucketsNameIsUnique2 = ',this.bucketsNameIsUnique);
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
  

  delTaskByIdBucket(idBucket: number): void {
    this.taskService.getTasks()
      .subscribe( async tasks => {
        this.taskList = tasks
         .filter(item =>
            item.IdBucket === idBucket)
      
            for (let i = 0; i<= this.taskList.length-1; i++){
              forkJoin ({a: this.taskService.delTaskById1(this.taskList[i].Id)}).subscribe();
            }
    });
  }

}
