import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { LoaderService } from '../services/loader.services';
import Swal from "sweetalert2";
import { AdminService } from '../services/admin.services';
import { first } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  loginData = JSON.parse(localStorage.getItem("login"));
  token = this.loginData["token"];
  userRoles;
  deleteUserRoleMessage: boolean;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminService
  ) { }

  ngOnInit() {

    /* list out the user-roles from the DB **/
    this.service.getUserRoles(this.token)
    .pipe(first())
    .subscribe(
      data => {
        // console.log('userroles', data);
        this.userRoles = data.data;
        this.dtTrigger.next();
      }
    );

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
  }

  /** delete the role */
  OnDeleteUser(id) {
    const formData = new FormData();
    formData.append("id", id);
    this.deleteUserRoleMessage = false;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        // console.log('test');
          this.service
          .deleteUserRole(formData, this.token)
          .pipe(first())
          .subscribe(data => {
            // console.log("deleteDocument", data);
            // this.deleteUserRoleMessage = true;
            Swal.fire('User Role has been deleted!', '', 'success')
            this.userRoles = data.data;
             this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
              })
            // this.dtTrigger.next();
            this.ngOnInit();
          },
          error => {
            // console.log("error", error);
          });
        }
    })
  }

  onAddUser(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  userEdit(data){
    let id= data['id'];
    this.router.navigate([id +'/edit'], {relativeTo: this.route});
  }

}
