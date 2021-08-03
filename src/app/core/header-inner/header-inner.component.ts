import { Component } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-header-inner",
  templateUrl: "./header-inner.component.html",
  styleUrls: ["./header-inner.component.css"]
})
export class HeaderInnerComponent {
  public loginData: string;
  profileName: string;
  constructor(private router: Router) {
    this.loginData = JSON.parse(localStorage.getItem("login"));

    // if (Object.keys(this.loginData).length > 0) {
    if (this.loginData != null) {
      this.profileName = this.loginData["login"]["full_name"]
        ? this.loginData["login"]["full_name"]
        : "UserProfile";
    } 
    // else {
    //   console.log("re-login");
    //   this.router.navigate(["login"]);
    // }

    
  }
  logout() {
    localStorage.clear();
  }
}
