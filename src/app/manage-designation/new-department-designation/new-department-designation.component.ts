import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.services';
import Swal from "sweetalert2";

@Component({
  selector: 'app-new-department-designation',
  templateUrl: './new-department-designation.component.html',
  styleUrls: ['./new-department-designation.component.css']
})
export class NewDepartmentDesignationComponent implements OnInit {

  loginData = JSON.parse(localStorage.getItem("login"));
  token = this.loginData["token"];
  addSucessMessage : boolean;
  updateSucessMessage : boolean;
   designation_details: Array<any> = [];
   department_details: Array<any> = [];
   department_designation_details: Array<any> = [];
   

  newRole: FormGroup;
  departmentDesignation: FormGroup;
  dropdownList = [];
  designationDropdownList = [];
  departmentDropdownList = [];
  department_designation_id_detail: number;
  department_designation_name_detail;
  department_designation;
  roleIdName;
  roleId;
  designationselectedItem;
  departmentselectedItem;
  param_id;
  departmentdropdownSettings = {};
  designationdropdownSettings = {};
  dropdownSettings = {};
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: AdminService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.initForm();

    /* get all the permission and list out in the dropdown **/
    this.service
      .manageDepartmentDetails(this.token)
      .pipe(first())
      .subscribe(
        data => {
          this.departmentDropdownList = data.data;
          // console.log("manage-department-data ", data.data);
        },
        error => {
          // console.log("error", error);
        }
      );
    
      this.service
      .getDesignationDetails(this.token)
      .pipe(first())
      .subscribe(
        data => {
          this.designationDropdownList = data.data;
          // console.log("get-designation-data ", this.designationDropdownList);
        },
        error => {
          // console.log("error", error);
        }
      );

       /* departmentdropdownSettings Settings **/
     this.departmentdropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'department',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 30,
      allowSearchFilter: true
    };

    /* designationdropdownSettings Settings **/
      this.designationdropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'designation_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 30,
      allowSearchFilter: true
    };

    

      this.route.params.subscribe((params: Params) => {
      // console.log("params ", params.id);
      this.param_id =  params.id;
      if(params.id){
        this.loaderService.isLoading.next(true);
        this.roleId = true;

        /** get the particular department designation list */
        this.service.particularDepartmentDesignationDetails(this.token, params.id).subscribe(
          data => {
            this.loaderService.isLoading.next(false);
            // console.log('particularDepartmentDetails', data.data);
            let DepartmentDesignation = data.data;
            for (let i = 0; i < DepartmentDesignation.length; i++) { 
              this.designation_details.push({
                id:   Number(DepartmentDesignation[i].designation_id),
                designation_name: DepartmentDesignation[i].designation_name
              });
              this.department_designation_id_detail = DepartmentDesignation[i].department_id;
              this.department_designation_name_detail = DepartmentDesignation[i].department_name;
            }
              for (let i = 1; i < DepartmentDesignation.length; i++) { 
              this.department_details.push({
                id:   Number(DepartmentDesignation[1].department_id),
                department: DepartmentDesignation[1].department_name
              });
              
              
              // this.department_designation_id_detail = DepartmentDesignation[i].department_id;
            }
                this.department_designation = this.department_designation_id_detail;
                this.designationselectedItem = this.designation_details;
                // this.departmentselectedItem = this.department_details;
          },
          error => {
            // console.log('error', error);
          }
        );
      }
    });
  }
  
  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }
  
  private initForm() {
    this.departmentDesignation = new FormGroup({
      department_designation_id: new FormControl(null),
      department_id: new FormControl(null, Validators.required),
      designation_id: new FormControl(null, Validators.required)
    });
  }

  get department() {
    return this.departmentDesignation.get("department_id");
  }

  get designation() {
    return this.departmentDesignation.get("designation_id");
  }

    onSubmit(){
    if (this.departmentDesignation["value"]["department_designation_id"]) {
      this.updateSucessMessage = false;
      // console.log('sucess123', this.departmentDesignation['value']);
      this.department_designation_details = [];
    let department_id;

      department_id = this.departmentDesignation['value']['department_designation_id']; 
      
    for (let i = 0; i < this.departmentDesignation['value']['designation_id'].length; i++) { 
      this.department_designation_details.push({
        department_id:   department_id,
        designation_id: this.departmentDesignation['value']['designation_id'][i]['id']
      });
    }
    
    // console.log('department_designation_details', this.department_designation_details);
    this.service
      .updateDepartmentDesignation(this.token, this.department_designation_details)
      .pipe(first())
      .subscribe(
        data => {
          // console.log("data ", data);
          if (data.message == "Department Designation Updated Successfully") {
            // this.updateSucessMessage = true;
            Swal.fire('Department Designation has been updated successfully!', '', 'success')
          }
        },
        error => {
          // console.log("error", error);
        }
      );
    }
    else{
    this.addSucessMessage = false;
    // console.log('departmentDesignation', this.departmentDesignation['value']);
    this.department_designation_details = [];
    let department_id;

    for (let index = 0; index < this.departmentDesignation['value']['department_id'].length; index++) {
      department_id = this.departmentDesignation['value']['department_id'][index]['id']; 
    }
      
    for (let i = 0; i < this.departmentDesignation['value']['designation_id'].length; i++) { 
      this.department_designation_details.push({
        department_id:   department_id,
        designation_id: this.departmentDesignation['value']['designation_id'][i]['id']
      });
    }
    
    // console.log('department_designation_details', this.department_designation_details);
    this.service
      .addDepartmentDesignation(this.token, this.department_designation_details)
      .pipe(first())
      .subscribe(
        data => {
          // console.log("data ", data);
          if (data.message == "Department Designation created successfully") {
            this.addSucessMessage = true;
            Swal.fire('Department Designation has been created successfully!', '', 'success')
          }
        },
        error => {
          // console.log("error", error);
        }
      );
    }
  }

}
