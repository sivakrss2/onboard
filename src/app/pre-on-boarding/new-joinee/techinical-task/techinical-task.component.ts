import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { JoineeService } from 'src/app/services/joinee.services';
import { LoaderService } from 'src/app/services/loader.services';
@Component({
  selector: 'app-techinical-task',
  templateUrl: './techinical-task.component.html',
  styleUrls: ['./techinical-task.component.css']
})
export class TechinicalTaskComponent implements OnInit {

  @Input() data: string;
  @Input() id: string;
  @Input() trainingDetails: any;
  @Input() consultantDetails: any;

  public trainingTechDetails: any = {};
  public consultantTechDetails: any = {};
  joineeConsultantTechinicalDocument: FormGroup;
  joineeTrainingTechinicalDocument: FormGroup;
  consultantleadTask: boolean = false;
  trainingleadTask: boolean = false;
  consultantleadTaskAssign: boolean = false;
  trainingleadTaskAssign: boolean = false;
  addTechinicalTaskPermission: boolean = false;
  login = JSON.parse(localStorage.getItem('login'));
  permission = JSON.parse(localStorage.getItem('permissions'));
  userId = this.login['login']["id"];
  token = this.login["token"];
  joinee_id;
  techMessageSucess;
  techupdateMessageSucess;
  message: any;
  consultant_task_assigned_value;
  training_task_assigned_value;
  taskCompletedDate : boolean = true;
  minDate = new Date();

  status = [
      { id: 'In Progress', status: "In Progress" },
      { id: 'Hold', status: "Hold" },
      { id: 'Completed', status: "Completed" }
    ];

  constructor(private fb: FormBuilder,
             private router: Router,
             private service: JoineeService,
             private loaderService: LoaderService,) {
              this.minDate.setDate(this.minDate.getDate() - 1);
              }

  ngOnInit() {
    this.initForm();
    /* get the joinee id **/
    this.joinee_id = this.login['login']['id'];
    // console.log('test',this.data);
    // console.log('id',this.id);
    // console.log('trainingDetails',this.trainingDetails);
    // console.log('consultantDetails',this.consultantDetails);

    /** techinical task update Permission */
    let TechinicalDocumentPermission = this.permission['permissions'].find((x: { id: number; }) => x.id == 5);
    if(TechinicalDocumentPermission != null){
      this.addTechinicalTaskPermission = true; 
    }

    /* list the consultant task details **/
    if(this.consultantDetails != null){
      // console.log('sucess');
      this.consultantTechDetails = this.consultantDetails;
      
      this.consultant_task_assigned_value =this.consultantTechDetails["task_assigned"].toString();
      // this.consultantleadTaskAssign = false;
      if(this.consultantTechDetails.task_assigned == 1){
        this.consultantleadTaskAssign = true;
        let candidate_techinical_task_detail = this.consultantTechDetails["candidate_techinical_task_detail"];
        const task_details = this.joineeConsultantTechinicalDocument.controls
        .task_details as FormArray;
        this.onRemoveConsultantTask(0);
        candidate_techinical_task_detail.forEach((elem: { id: any;task_detail: any; task_start_date: any; task_end_date: any; task_status: any; }) => {
          task_details.push(
            this.fb.group({
              taskDetailId: [elem.id],
              taskDetails: [elem.task_detail, [Validators.required]],
              taskStartDate: [elem.task_start_date, [Validators.required]],
              taskCompletedDate: [elem.task_end_date, [Validators.required]],
              taskStatus: [elem.task_status, [Validators.required]]
            })
          );
        });
      }
    }

    /* list the training task details **/
    if(this.trainingDetails != null){
      // console.log('sucess');
      this.trainingTechDetails = this.trainingDetails;
      this.training_task_assigned_value =this.trainingTechDetails["task_assigned"].toString();
      // this.trainingleadTaskAssign = false;
      if(this.trainingTechDetails.task_assigned == 1){
        this.trainingleadTaskAssign = true;
        let candidate_techinical_task_detail = this.trainingTechDetails["candidate_techinical_task_detail"];
        const task_details = this.joineeTrainingTechinicalDocument.controls
        .task_details as FormArray;
        this.onRemoveTraingTask(0);
        candidate_techinical_task_detail.forEach((elem: { id: any;task_detail: any; task_start_date: any; task_end_date: any; task_status: any; }) => {
          task_details.push(
            this.fb.group({
              taskDetailId: [elem.id],
              taskDetails: [elem.task_detail, [Validators.required]],
              taskStartDate: [elem.task_start_date, [Validators.required]],
              taskCompletedDate: [elem.task_end_date, [Validators.required]],
              taskStatus: [elem.task_status, [Validators.required]]
            })
          );
        });
      }
      
    }

    /* get the joinee id **/
    this.service
      .getTechDocument(this.token, this.id)
      .pipe(first())
      .subscribe(
        data => {
          // console.log("data-tech ", data);
        },
        error => {
          // console.log("error", error);
        }
      );

    
    /*open the form using the key **/
    let data = this.data;
    if(data == "0")
    {
      this.consultantleadTask = true;
    }
    if(data == "1")
    {
      this.trainingleadTask = true;
    }
    // this.initForm();
  }

  private initForm() {
    // console.log('initForm');

  this.joineeConsultantTechinicalDocument = new FormGroup({
    techinicalTaskId: new FormControl(null),
    clientName: new FormControl(null, [Validators.required]),
    taskAssigned: new FormControl(null, [Validators.required]),
    task_details: this.fb.array([this.onAddTask_details_FormGroup()])
  });

  this.joineeTrainingTechinicalDocument = new FormGroup({
    techinicalTaskId: new FormControl(null),
    taskAssigned: new FormControl(null, [Validators.required]),
    task_details: this.fb.array([this.onAdd_Training_task_details_FormGroup()])
  });
}

get clientName() {
  return this.joineeConsultantTechinicalDocument.get("clientName");
}

/**validate consultant task_details */
onAddTask_details_FormGroup(): FormGroup {
  return this.fb.group({
    taskDetailId: new FormControl(null),
    taskDetails: new FormControl(null, [Validators.required]),
    taskStartDate: new FormControl(null, [Validators.required]),
    taskCompletedDate: new FormControl(null, [Validators.required]),
    taskStatus: new FormControl(null, [Validators.required]),
  });
}

/**validate training task_details */
onAdd_Training_task_details_FormGroup(): FormGroup {
  return this.fb.group({
    taskDetailId: new FormControl(null),
    taskDetails: new FormControl(null, [Validators.required]),
    taskStartDate: new FormControl(null, [Validators.required]),
    taskCompletedDate: new FormControl(null, [Validators.required]),
    taskStatus: new FormControl(null, [Validators.required]),
  });
}

/**Add consultant task_details */
onAddTask(): void {
  const task_details = this.joineeConsultantTechinicalDocument.controls
    .task_details as FormArray;
  task_details.push(this.onAddTask_details_FormGroup());
}

/**Add training task_details */
onAddTraingTask(): void {
  const task_details = this.joineeTrainingTechinicalDocument.controls
    .task_details as FormArray;
  task_details.push(this.onAddTask_details_FormGroup());
}

/**Remove consultant task_details */
onRemoveConsultantTask(index: number) {
  (<FormArray>this.joineeConsultantTechinicalDocument.get("task_details")).removeAt(index);
}

/**Remove training task_details */
onRemoveTraingTask(index: number) {
  (<FormArray>this.joineeTrainingTechinicalDocument.get("task_details")).removeAt(index);
}

techinicalDocumentSubmit(key) {
  // console.log('test1w234', this.consultantTechDetails.id);
  // console.log('test1w234', this.trainingTechDetails.id);
  this.techMessageSucess = false;
  this.techupdateMessageSucess = false;
let formdata = new FormData();
if(this.consultantTechDetails.id == null && this.trainingTechDetails.id == null)
{
  if(key == "Consultant"){
    formdata.append("created_by", this.userId);
    formdata.append("taskId", "0");
    for (const key in this.joineeConsultantTechinicalDocument["value"]) {
      if (key == "task_details") {
        this.joineeConsultantTechinicalDocument["value"][key].forEach((elem, index) => {
          formdata.append(
            "task_details[" + index + "][taskDetails]",
            elem["taskDetails"]
          );
          formdata.append(
            "task_details[" + index + "][taskStartDate]",
            elem["taskStartDate"]
          );
          formdata.append(
            "task_details[" + index + "][taskCompletedDate]",
            elem["taskCompletedDate"]
          );
          formdata.append(
            "task_details[" + index + "][taskStatus]",
            elem["taskStatus"]
          );
        });
      }
      else {
        formdata.append(key, this.joineeConsultantTechinicalDocument["value"][key]);
      }
    }
      this.taskAssigned(0); 
  }
  if(key == "Training"){
    formdata.append("created_by", this.userId);
    formdata.append("taskId", "1");
    for (const key in this.joineeTrainingTechinicalDocument["value"]) {
      if (key == "task_details") {
        this.joineeTrainingTechinicalDocument["value"][key].forEach((elem, index) => {
          formdata.append(
            "task_details[" + index + "][taskDetails]",
            elem["taskDetails"]
          );
          formdata.append(
            "task_details[" + index + "][taskStartDate]",
            elem["taskStartDate"]
          );
          formdata.append(
            "task_details[" + index + "][taskCompletedDate]",
            elem["taskCompletedDate"]
          );
          formdata.append(
            "task_details[" + index + "][taskStatus]",
            elem["taskStatus"]
          );
        });
      }
      else {
        formdata.append(key, this.joineeTrainingTechinicalDocument["value"][key]);
      }
    }
      this.taskAssigned(3);
  }
  // console.log(key);
  
  this.loaderService.isLoading.next(true);
    this.service
    .addTechinicalTask(this.token, formdata, this.id)
    .pipe(first())
    .subscribe(
      data => {
        this.loaderService.isLoading.next(false);
        // console.log(data);
        if (data.data == "Techinical Task updated successfully") {
          // this.techMessageSucess = true;
          Swal.fire('Techinical details has been added successfully!', '', 'success')
        }
      },
      error => {
        this.loaderService.isLoading.next(false);
        // console.log("error", error);
      }
    );
  }
  else{
    if(key == "Consultant"){
      // formdata.append("techinicalTaskId", this.consultantTechDetails.id);
      formdata.append("created_by", this.userId);
      formdata.append("taskId", "0");
      for (const key in this.joineeConsultantTechinicalDocument["value"]) {
        if (key == "task_details") {
          this.joineeConsultantTechinicalDocument["value"][key].forEach((elem, index) => {
            formdata.append(
              "task_details[" + index + "][taskDetails]",
              elem["taskDetails"]
            );
            formdata.append(
              "task_details[" + index + "][taskStartDate]",
              elem["taskStartDate"]
            );
            formdata.append(
              "task_details[" + index + "][taskCompletedDate]",
              elem["taskCompletedDate"]
            );
            formdata.append(
              "task_details[" + index + "][taskStatus]",
              elem["taskStatus"]
            );
          });
        }
        else {
          formdata.append(key, this.joineeConsultantTechinicalDocument["value"][key]);
        }
      }
    }
    if(key == "Training"){
      // console.log('123', this.trainingTechDetails.id);
      // formdata.append("techinicalTaskId", this.trainingTechDetails.id);
      formdata.append("created_by", this.userId);
      formdata.append("taskId", "1");
      for (const key in this.joineeTrainingTechinicalDocument["value"]) {
        if (key == "task_details") {
          this.joineeTrainingTechinicalDocument["value"][key].forEach((elem, index) => {
            formdata.append(
              "task_details[" + index + "][taskDetails]",
              elem["taskDetails"]
            );
            formdata.append(
              "task_details[" + index + "][taskStartDate]",
              elem["taskStartDate"]
            );
            formdata.append(
              "task_details[" + index + "][taskCompletedDate]",
              elem["taskCompletedDate"]
            );
            formdata.append(
              "task_details[" + index + "][taskStatus]",
              elem["taskStatus"]
            );
          });
        }
        else {
          formdata.append(key, this.joineeTrainingTechinicalDocument["value"][key]);
        }
      }
    }
    // console.log(key);
    this.loaderService.isLoading.next(true);
      this.service
      .updateTechinicalTask(this.token, formdata, this.id)
      .pipe(first())
      .subscribe(
        data => {
          this.loaderService.isLoading.next(false);
          // console.log(data);
          if (data.data == "Techinical details updated successfully") {
            // this.techupdateMessageSucess = true;
            Swal.fire( 'Techinical details has been updated successfully!', '', 'success')
          }
        },
        error => {
          this.loaderService.isLoading.next(false);
          // console.log("error", error);
        }
      );
  }
}

  /** show the consultant task module */
  openConsultantTask(key){
    this.consultantleadTask = true;
    this.trainingleadTask = false;
    this.joineeTrainingTechinicalDocument.reset();
    this.trainingleadTaskAssign = false;
  }

   /** show the Training task module */
  openTrainingTask(key){
    this.trainingleadTask = true;
    this.consultantleadTask = false;
    this.joineeConsultantTechinicalDocument.reset();
    this.consultantleadTaskAssign = false;
  }

  checkStartDate(){
    this.taskCompletedDate = false;
  }

  taskAssigned(key){
    switch (key) {
      case 0:
        this.consultantleadTaskAssign = false;
          break;
      case 1:
        this.consultantleadTaskAssign = true;
          break;
      case 2:
        this.trainingleadTaskAssign = true;
          break;
      case 3:
        this.trainingleadTaskAssign = false;
          break;
      default:
        this.consultantleadTaskAssign = false;
        this.trainingleadTaskAssign = false;
          break;
  }
  }
/** close the module and return to home module */
OnCloseJoinee() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to exit?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.value) {
      this.router.navigate(["pre-on-boarding"]);
    }
  })
}
}
