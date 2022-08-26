import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task-model';
import { Bucket } from '../../models/bucket-model';
import { ModalService } from '../../modal/bucket/modal.service';
/*in-memory-data-service*/
//!!import { TaskService } from 'src/app/services/task-service';
/*json-service*/
import { TaskService } from 'src/app/services/task-json.service';
import { States } from '../../models/state-mock';
import { Priorities } from '../../models/priority-mock';
import { delay, forkJoin, map, Observable, ObservableInput, switchAll, switchMap } from 'rxjs';
import { TaskResponse } from 'src/app/models/task-response';

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
  taskTitleInput = '';
  taskDescrInput = ''; 
  taskPriorInput = ''; 
  taskStatsInput = ''; 
  taskAssigInput = '';
  isButtonEnabled!: boolean;
  isToolTipEnabled!: boolean;
  errorMsg = "";
  t!:Task[];
  t1!:Task;
  t2!:any

  constructor(
    private taskService: TaskService,
    private modalService: ModalService,
  ) { }

  ngOnInit( ): void {

    this.getTasksByType(this.bucketId,this.bucketType);

  }


  async editTaskModal(id: string, taskId: number) {
    //!!
    await this.getTaskById(taskId);
    //!!
    //delay(1000000);
  //console.log('this.taskId=',this.taskId); 
    //!!
    this.modalService.open(id);
  //}

  /*
  //!!this.t2=
 this.taskService.getTasks().pipe( 
  switchMap( (value , index)  => 
    { 
      //!!this.t2 = 
       return 
  //!!this.t2 = 
this.taskService.getTasks()
      .subscribe(tasks => {this.taskListTmp = tasks
        //.filter(item =>
        //  item.Id === id);
      }
      )
    }
    )
  ).subscribe(tasks => {
    this.taskListTmp = tasks
    console.log('this.taskLi stTmp=',this.taskListTmp)
  });
  //}
*/
/*  
this.taskService.getTasks().pipe(
    //switchMap((users: Task[]) => {
      switchMap((users) => {
      // Create and initialize the array
console.log('users=',users);
 //     const addressArray$: Observable<Task[]>[] = [];
      // Iterate over 'users' array
 //     users.forEach(user => {
 //       const address$: Observable<Task[]> = 
 const a =  this.taskService.getTasks();
//        addressArray$.push(address$);
//console.log('addressArray=',addressArray$);
//      });
      // [Observable<Address>, Observable<Address>, ....., Observable<Address>]
      return forkJoin(a);
    }
    )
  )*/
  }
/*
observable$.pipe( switchMap(value => someService.processValue(value)), 
                  switchMap(someServiceResponse => andYetAnotherService.processAnotherValue(someServiceResponse)), 
                  switchMap(yetAnotherResponse => veryImportantService.processVeryImportantValue(yetAnotherResponse))
                ).subscribe(veryImportantResponse => ...)
*/
  /*
  src/app/components/task-list/task-list.component.ts:61:14 - error TS2345: Argument of type '(taskResponse: Task[]) => Subscription' is not assignable to parameter of type '(value: Task[], index: number) => ObservableInput<any>'.
  Type 'Subscription' is not assignable to type 'ObservableInput<any>'.

61   switchMap( taskResponse => {
  */
/*
this.categoriesService.getCategories().pipe(
      switchMap((categoriesResponse) => {
        this.categoryName = categoriesResponse.categories.filter(cat => cat.idCategory === this.mealsInCategoryParam)[0].strCategory;
        return this.mealsService.listMealsInCategory(this.categoryName);
        
      }))
      .subscribe(mealsResponse => this.mealsList = mealsResponse.meals);
*/

  async getTaskById(ident: number): Promise<void> {
    console.log('ident=',ident);
    /* 
    await this.taskService.getTasks()
      .subscribe(tasks => {this.taskListTmp = tasks
        .filter(item =>
          item.Id === ident)

          this.taskId         = this.taskListTmp[0].Id;
          this.taskTitleInput = this.taskListTmp[0].Title;
          this.taskDescrInput = this.taskListTmp[0].Description; 
          this.taskPriorInput = this.taskListTmp[0].Priority; 
          this.taskStatsInput = this.taskListTmp[0].State; 
          this.taskAssigInput = this.taskListTmp[0].Asignee;
console.log('this.taskListTmp[0].Id=',this.taskListTmp[0].Id); 
        });
//*/

await this.taskService.getTaskById(ident)
      .subscribe((tasks) => {this.taskListTmp = tasks
        //.filter(item =>
          //item.Id === ident)
/*
          this.taskId         = this.taskListTmp[0].Id;
          this.taskTitleInput = this.taskListTmp[0].Title;
          this.taskDescrInput = this.taskListTmp[0].Description; 
          this.taskPriorInput = this.taskListTmp[0].Priority; 
          this.taskStatsInput = this.taskListTmp[0].State; 
          this.taskAssigInput = this.taskListTmp[0].Asignee;

*/          //console.log('this.taskListTmp[0].Id=',this.taskListTmp[0].Id); 
        });
        //console.log('this.taskListTmp[0].Id=',this.taskListTmp[0].Id); 

/*
let s11: Task[];
        this.taskService.getTaskById(ident).pipe(
          switchMap( (s) => {
console.log('s=',s);
            const ty: Observable<Task[]>[] = [];
            //this.taskTitleInput = s[0].Title;
              //ty = s;
              //const ty1: Observable<Task[]> = this.taskService.getTaskById(ident);
              //s.forEach(user => {
                const ty1: Observable<Task[]> = this.taskService.getTaskById(ident);
console.log('ty=',ty1);
                ty.push(ty1);
                //this.taskTitleInput = s[0].Title;
                //ty[0].
console.log('ty1=',ty);
              return forkJoin(ty);
          }
          
          )
          
        )
        //!!.subscribe()
        .subscribe(s => {this.taskListTmp1 = s
    console.log('this.s1=',s);
    console.log('this.s2=',s[0]);
    console.log('this.s2=',s[0]);
    //this.taskTitleInput = this.taskListTmp[0].Title;
   // s1.forEach{
     // this.taskTitleInput =
    //}
        });

        //his.taskTitleInput = this.taskListTmp1{Id}. . .Title;
        //this.taskId         = s[0].Id;
///console.log('a=',a);
/*
console.log('this.taskListTmp1[0].Id=',this.taskListTmp1[0].Id);
            this.taskId         = s.Id;
            this.taskTitleInput = this.taskListTmp1[0].Title;
            this.taskDescrInput = this.taskListTmp1[0].Description; 
            this.taskPriorInput = this.taskListTmp1[0].Priority; 
            this.taskStatsInput = this.taskListTmp1[0].State; 
            this.taskAssigInput = this.taskListTmp1[0].Asignee;
  console.log('this.taskListTmp1[0].Id=',this.taskListTmp1[0].Id); 
*/
//});
//*/
/*
    this.taskService.getTasks().pipe(
      switchMap( (s) => {
        console.log('s1=',s);
        console.log('s2=',s[0].Id);
        
        this.taskTitleInput = s[0].Title;

        return this.taskService.getTaskById(ident)
        //this.taskTitleInput = s[0].Title;
      }
      //this.taskTitleInput = s[0].Title;
      )
      //this.taskTitleInput = s[0].Title;
    ).subscribe(tasks => {this.taskListTmp = tasks
      console.log('tasks1=',tasks);
      //console.log('tasks1=',tasks[0].Id);
      console.log('tasks2=',this.taskListTmp);
      //console.log('tasks3=',this.taskListTmp[0]);

      //this.taskTitleInput = this.taskListTmp[0].Title;
    });

    //this.taskTitleInput = this.taskListTmp[0].Title;
    console.log('this.taskTitleInput=',this.taskTitleInput);  
*/
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

    this.taskService.updTask(this.taskListTmp[0], taskNew);
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
      this.taskService.updTask(this.taskListTmp[0], taskNew);
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


}
