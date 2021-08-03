import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-sidebar-left-inner",
  templateUrl: "./sidebar-left-inner.component.html"
})
export class SidebarLeftInnerComponent {
  public loginData: string;
  profileName: string;
  profileStatus: string;
  roleId;
  menu = [];
  
  constructor(private router: Router) {
    this.loginData = JSON.parse(localStorage.getItem("login"));
    // console.log('test123', this.loginData);
    
    if (localStorage != null) {
      if(this.loginData !== null){
        this.roleId = this.loginData["login"]["roles"]['0'].id;
      }
    }

    // if (Object.keys(this.loginData).length > 0) {
    if(this.loginData != null){
      this.profileName = this.loginData["login"]["full_name"]
        ? this.loginData["login"]["full_name"]
        : "UserProfile";
      this.profileStatus = "Online";
    }

    this.menu = [
      {label: 'Dashboard', route: 'dashboard', iconClasses: 'fa fa-dashboard'},
      {label: 'Pre On Boarding', route: 'pre-on-boarding', iconClasses: 'fa fa-handshake-o'},
      {label: 'Up-Comming Joinees', route: 'upcomming-joinee', iconClasses: 'fa fa-users'},
    ]
  
    if(this.roleId == 1){
      let index = this.menu.findIndex((x: { label: any; }) => x.label == 'Pre On Boarding');
      this.menu.splice(index, 1);
      this.menu.push({label: 'Role Administration', route: 'role-administration', iconClasses: 'fa fa-user-circle'});
      this.menu.push({label: 'Manage Users', route: 'manage-users', iconClasses: 'fa fa-address-card-o'});
      this.menu.push({label: 'Designation', route: 'designation', iconClasses: 'fa fa-wpforms'});
      this.menu.push({label: 'Manage Designation', route: 'manage-designation', iconClasses: 'fa fa-th-list'});
    }
    
  }
}
