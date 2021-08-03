import { AuthService } from "./../services/auth.services";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { first } from "rxjs/operators";
import { TestBed } from "@angular/core/testing";
import { LoaderService } from "../services/loader.services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userDetails: FormGroup;
  invalidLogin = false;
  isLoggedIn = false;
  isError;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private AuthService: AuthService,
    private fb: FormBuilder,
    private loaderService: LoaderService,
  ) {}

  ngOnInit() {
    this.userDetails = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get userName() {
    return this.userDetails.get("userName");
  }

  get password() {
    return this.userDetails.get("password");
  }
  login() {
    this.isError = false;
    const userData = this.userDetails.value;
    // let isValidUser = this.AuthService.checkLogin(
    //   userData.userName,
    //   userData.password
    // );
    // this.invalidLogin = isValidUser ? false : true;
    // if (isValidUser) {
    //   this.router.navigate(["dashboard"]);
    //   return;
    // }

    this.loaderService.isLoading.next(true);
    this.AuthService.checkLogin(userData.userName, userData.password)
      .pipe(first())
      .subscribe(
        data => {
          this.loaderService.isLoading.next(false);
          // console.log("data", data);
          localStorage.removeItem("login");
          localStorage.removeItem("permissions");
          const token = data["token"];
          // if(data.user["roles"]){
          //   const role_id = data.user["roles"][0]['id'];
          // }
          // console.log('roles', id);
          localStorage.setItem(
            "login",
            JSON.stringify({
              token: token,
              login: data["user"]
            })
          );
          if(data.user["roles"] != ""){
            // console.log('test', 'test');
            const role_id = data.user["roles"][0]['id'];
            // console.log('roles', role_id);
            this.loaderService.isLoading.next(true);
            this.AuthService.checkPermission(token, role_id)
            .pipe(first())
            .subscribe(
              data => {
                this.loaderService.isLoading.next(false);
                localStorage.removeItem("permissions");
                localStorage.setItem(
                  "permissions",
                  JSON.stringify({
                    permissions: data.data
                  })
                );
                // console.log("permission-data", data);
                let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                this.router.navigate([returnUrl || "dashboard"]);
                 return;
              },
              error => {
                this.loaderService.isLoading.next(false);
                // console.log("permission_error", error);
              }
            );
            }
            else{
              this.loaderService.isLoading.next(false);
              // console.log('role has not been set');
              
            }
        },
        error => {
          this.loaderService.isLoading.next(false);
          // $(".error_message").show();
          this.isError = true;
          // console.log("error", error);
        }
      );
  }
}
