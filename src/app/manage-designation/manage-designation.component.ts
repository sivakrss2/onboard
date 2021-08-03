import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from "sweetalert2";
import { AdminService } from '../services/admin.services';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-manage-designation',
  templateUrl: './manage-designation.component.html',
  styleUrls: ['./manage-designation.component.css']
})
export class ManageDesignationComponent implements OnInit {

  loginData = JSON.parse(localStorage.getItem("login"));
  token = this.loginData["token"];
  roles;
  designationDepartment

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminService
  ) { }

  ngOnInit() {

    this.service.getDepartmentDesignation(this.token)
    .pipe(first())
    .subscribe(
      data => {
        // console.log('designationDepartment', data.data);
        this.designationDepartment = data.data;
            this.dtTrigger.next();
      }
    );

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };

     

  }

  /** navigate to add page */
  onAdddepartmentDesignation(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  /** delete the role */
  OnDeleteRole() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        alert('hi');
      }
    })
  }

  /** navigate to edit page */
  departmentDesignationEdit(data){
    let id= data['department_id'];
    this.router.navigate([id +'/edit'], {relativeTo: this.route});
  }
}
