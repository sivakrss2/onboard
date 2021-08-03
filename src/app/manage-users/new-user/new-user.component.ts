import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.services';
import Swal from "sweetalert2";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  loginData = JSON.parse(localStorage.getItem("login"));
  token = this.loginData["token"];
  public particularUser: any = {};;
  users;
  roles;
  addSucessMessage : boolean;
  updateSucessMessage : boolean;
  showUserNameText : boolean = false;
  showUserDropDown : boolean = true;
  updateBtn : boolean = false;

  newUser: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: AdminService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      // console.log("params ", params.id);
      if(params.id != null){
        this.showUserNameText = true;
        this.showUserDropDown = false;
        this.updateBtn = true;
        
        this.loaderService.isLoading.next(true);
      /* list the particular user roles  **/
      this.service
      .getParticularUserRoles(this.token, params.id)
      .subscribe(
            data => {
              this.loaderService.isLoading.next(false);
              this.particularUser = data["data"][0];
              // console.log(this.particularUser);
              
              this.newUser
                .get("role_id")
                .setValue(+this.particularUser["role_id"]);
            },
            error => {
              // console.log('error', error);
            }
      )
          }
    });

    /* list out the users from the DB **/
     this.service
      .getUsers(this.token)
      .pipe(first())
      .subscribe(
        data => {
          // console.log("user-data ", data);
          this.users = data.data;
        },
        error => {
          // console.log("error", error);
        }
      );

    /* list out the roles from the DB **/
      this.service.getRoles(this.token)
      .pipe(first())
      .subscribe(
        data => {
          // console.log('roles3', data.data.data);
          this.roles = data.data.data;
        }
      );

    this.initForm();
  }

  private initForm() {
    this.newUser = new FormGroup({
      id: new FormControl(null),
      user_id: new FormControl(null, Validators.required),
      role_id: new FormControl(null, Validators.required),
    });
  }

  get userName() {
    return this.newUser.get("user_id");
  }

  get role() {
    return this.newUser.get("role_id");
  }

  onSubmit(){

    if (this.newUser["value"]["id"]) {
      this.updateSucessMessage = false;
      // console.log('sucess', this.newUser['value']);
      this.service
        .updateUserRoles(
          this.token,
          this.newUser["value"]
        )
        .pipe(first())
        .subscribe(
          data => {
            // console.log('data', data);
            // this.updateSucessMessage = true;
            Swal.fire('User Role has been updated successfully!', '', 'success')
          },
          error => {
            // console.log('error', error);
          }
        );
    }
    else{
    this.addSucessMessage = false;
    // console.log('sucess', this.newUser['value']);
    this.service
      .addUserRoles(this.token, this.newUser['value'])
      .pipe(first())
      .subscribe(
        data => {
          // console.log("data ", data);
          if (data.message == "User Role created successfully") {
            // this.addSucessMessage = true;
            Swal.fire('User Role has been added successfully!', '', 'success')
            this.service
            .getUsers(this.token)
            .pipe(first())
            .subscribe(
              data => {
                // console.log("user-data ", data);
                this.users = data.data;
              },
              error => {
                // console.log("error", error);
              }
            );
          }
        },
        error => {
          // console.log("error", error);
        }
      );
    }
  }
}
