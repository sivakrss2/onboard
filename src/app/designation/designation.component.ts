import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { LoaderService } from '../services/loader.services';
import Swal from "sweetalert2";
import { AdminService } from '../services/admin.services';
import { first } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { JoineeService } from '../services/joinee.services';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  loginData = JSON.parse(localStorage.getItem("login"));
  token = this.loginData["token"];
  userRoles;
  deleteUserRoleMessage: boolean;
  designations;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminService,
    private adminService: JoineeService
  ) { }

  ngOnInit() {

    this.adminService
      .getDesignationDetails(this.token)
      .pipe(first())
      .subscribe(
        data => {
          this.designations = data.data;
          // console.log("getDesignationDetails ",this.designations);
        this.dtTrigger.next();
        },
        error => {
          // console.log("error", error);
        }
      );

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
  }

  /** delete the role */
  // OnDeleteUser(id) {
  //   const formData = new FormData();
  //   formData.append("id", id);
  //   this.deleteUserRoleMessage = false;
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'Do you want to delete?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes!',
  //     cancelButtonText: 'No'
  //   }).then((result) => {
  //     if (result.value) {
  //       console.log('test',id );
  //         // this.service
  //         // .deleteUserRole(formData, this.token)
  //         // .pipe(first())
  //         // .subscribe(data => {
  //         //   console.log("deleteDocument", data);
  //         //   this.deleteUserRoleMessage = true;
  //         //   this.userRoles = data.data;
  //         //    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //         //       dtInstance.destroy();
  //         //     })
  //         //   // this.dtTrigger.next();
  //         //   this.ngOnInit();
  //         // },
  //         // error => {
  //         //   console.log("error", error);
  //         // });
  //       }
  //   })
  // }

  onAddUser(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  userEdit(data){
    let id= data['id'];
    // console.log(id)
    this.router.navigate([id +'/edit'], {relativeTo: this.route});
  }


}
