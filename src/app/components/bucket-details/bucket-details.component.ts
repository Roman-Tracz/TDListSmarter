import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task-model';
import { Bucket } from '../../models/bucket-model';
import { States } from '../../models/state-mock';
import { ModalService } from '../../modal/bucket/modal.service';
/*in-memory-data-service*/
//import { BucketService } from 'src/app/services/bucket-service';     
//import { TaskService } from 'src/app/services/task-service';
/*json-service*/
import { BucketService } from 'src/app/services/bucket-json.service';  
import { TaskService } from 'src/app/services/task-json.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-bucket-details',
  templateUrl: './bucket-details.component.html',
  styleUrls: ['./bucket-details.component.css']
})
export class BucketDetailsComponent implements OnInit {

  @Input() bucketColor = "";
  @Input() bucketName = "";
  @Input() bucketId = 0;

  bucketList!: Bucket[];
  bucketListId!: Bucket[];
  taskList!: Task[];
  taskCount!: number;
  bucketId1 = 0;
  td = [0,0,0,0,0,0,0,0,0,0];

  constructor(
    private taskService: TaskService,
    private bucketService: BucketService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.getBucketById(this.bucketId);
    this.getTasksByType(this.bucketId, States[0]);
    this.bucketId1 = this.bucketId;
  }


  getTasksByType(Id_Bucket: number, state: string): void { 
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.taskList = tasks
          .filter(item =>
            item.IdBucket === Id_Bucket && 
            item.State === state)
          
            this.td[Id_Bucket] = this.taskList.length;
            this.taskCount = this.taskList.length;
        });
  }


  delTaskByIdBucket(idBucket: number): void {
    this.taskService.getTasks()
      .subscribe( async tasks => {
        this.taskList = tasks
         .filter(item =>
            item.IdBucket === idBucket)
      
        for (let i = 0; i<= this.taskList.length-1; i++){
          this.taskService.deleteTaskById(this.taskList[i].Id);
          delay(1000);
        }
      });
  }
  

  getBucketById(Id_Bucket: number): void {
    this.bucketService.getBuckets()
    .subscribe(buckets => {
      this.bucketListId = buckets.filter(item =>
      item.Id === Id_Bucket)
    });
  }


  async delBucket(id: number): Promise<void> {  
    this.bucketService.deleteBucketById(id);
    this.delTaskByIdBucket(id);
    this.closeModal('bucket-modal-yesNo-details');
    location.reload();
  }


  closeModal(id: string) {
    this.modalService.close(id);
 
  }

  
  openModalYN(id: string, id_bucket: number) {
    this.bucketId = id_bucket;
    this.getBucketById(id_bucket);
    this.modalService.open(id);
  }

}
