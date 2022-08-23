import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../../models/task-model';
import { TaskService } from 'src/app/services/task-service'; 
import { BucketService } from 'src/app/services/bucket-service'; 

import { ModalService } from '../../modal/bucket/modal.service';
import { Bucket } from '../../models/bucket-model';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
//import { threadId } from 'worker_threads';

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
  bucketListI!: Bucket[];
  taskList!: Task[];
 
  taskCount!: number;

  bucketId1 = 100;

  constructor(
    private taskService: TaskService,
    private bucketService: BucketService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {

    this.getTasksByType(this.bucketId, "To Do");
    //this.taskCount = this.taskList.length;
    this.getBucketById(this.bucketId);

    //this.bucketsMaxId = this.getBucketsMaxId();
    this.getBuckets();
    //this.bucketCount = this.bucketList.length;
    //this.getTasksByType(this.bucketId, "To Do");
    //this.taskCount = this.taskList.length;
    //this.bucketColrInput = 'Brown';
    //this.bucketMNOTInput = 15;
    this.bucketId1 = this.bucketId;
    


  }

  getBuckets(): void {
    this.bucketService.getBuckets()
      .subscribe(buckets => this.bucketList = buckets
        .sort((x,y) => x.Id < y.Id ? -1 : 1)
      );
  
  }


  getBucketById(Id_Bucket: number): void {
    this.bucketService.getBuckets()
      .subscribe(buckets => this.bucketListI = buckets
        .filter(item =>
          item.Id === Id_Bucket
      ));
    
  }


  getTasksByType(Id_Bucket: number, source_id: string): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.taskList = tasks
        .filter(item =>
          item.IdBucket === Id_Bucket && 
          item.State === source_id
        ));

  }


  delBucket(id: number): void {  
    this.bucketService.delBucketById(id);
      this.taskService.delTaskByIdBucket(id);
      //!!this.bucketCount--;
      //!!this.getBuckets();
      this.closeModal('bucket-modal-yesNo3');
  }


  openModal(id: string) {
    this.modalService.open(id);
  }


  closeModal(id: string) {
    this.modalService.close(id);
 
  }

  
  openModalY(id: string, id_bucket: number) {
    this.bucketId1 = id_bucket;
    //this.getBucketById(id_bucket);
    console.log('id_bucket',id_bucket);
    console.log('bucketListI',this.bucketListI);
    //this.bucketName = this.bucketList[id_bucket].Name;
    //this.bucketName = this.bucketList[id_bucket].Name;
    //this.bucketName = this.bucketList[0].Name;
    //this.bucketName = this.bucketListI[0].Name;
    this.modalService.open(id);
  }
}
