import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.services';
import Swal from "sweetalert2";

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.css']
})
export class NewRoleComponent implements OnInit {

  loginData = JSON.parse(localStorage.getItem("login"));
  token = this.loginData["token"];
  addSucessMessage : boolean;
  updateSucessMessage : boolean;
   permission_details: Array<any> = [];
   

  newRole: FormGroup;
  dropdownList = [];
  role_id_detail: number;
  role_name_detail: string;
  roleId;
  roleIdName;
  selectedItem;
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
      .getPermissions(this.token)
      .pipe(first())
      .subscribe(
        data => {
          // console.log("permission-data ", data.data);
          this.dropdownList = data.data;
        },
        error => {
          // console.log("error", error);
        }
      );
    
    /* dropdown Settings **/
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 30,
      allowSearchFilter: true
    };

      this.route.params.subscribe((params: Params) => {
      // console.log("params ", params.id);
      if(params.id){
        this.loaderService.isLoading.next(true);

        /* get the particular role permission from the database **/
        this.service.getParticularRolePermission(this.token, params.id).subscribe(
          data => {
            this.loaderService.isLoading.next(false);
            // console.log('getParticularRolePermission', data.data);
            let getParticularRolePermission = data.data;
            for (let i = 0; i < getParticularRolePermission.length; i++) { 
              this.permission_details.push({
                id:   Number(getParticularRolePermission[i].id),
                name: getParticularRolePermission[i].name
              });
              this.role_id_detail = getParticularRolePermission[i].role_id;
              this.role_name_detail = getParticularRolePermission[i].role_id_name;
            }
                this.roleId = this.role_id_detail;
                this.roleIdName = this.role_name_detail;
                this.selectedItem = this.permission_details;
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
    this.newRole = new FormGroup({
      role_id: new FormControl(null),
      role_name: new FormControl(null, Validators.required),
      permission_id: new FormControl(null, Validators.required)
    });
  }

  get roleName() {
    return this.newRole.get("role_name");
  }

  get permission() {
    return this.newRole.get("permission_id");
  }

  onSubmit(){
    if (this.newRole["value"]["role_id"]) {
      this.updateSucessMessage = false;
      // console.log('sucess', this.newRole['value']);
      this.service
        .updateRolePermission(
          this.token,
          this.newRole["value"]
        )
        .pipe(first())
        .subscribe(
          data => {
            // console.log('data', data);
            if (data.message == "Role Permissions Updated Successfully") {
              // this.updateSucessMessage = true;
              Swal.fire('Role permission has been updated successfully!', '', 'success')
            }
            // this.updateSucessMessage = true;
          },
          error => {
            // console.log('error', error);
          }
        );
    }
    else{
    this.addSucessMessage = false;
    // console.log('sucess', this.newRole['value']);
    this.service
      .addRolePermission(this.token, this.newRole['value'])
      .pipe(first())
      .subscribe(
        data => {
          // console.log("data ", data);
          if (data.message == "User Role created successfully") {
            // this.addSucessMessage = true;
            Swal.fire('A New Role permission has been created successfully!', '', 'success')
          }
        },
        error => {
          // console.log("error", error);
        }
      );
    }
  }
}
