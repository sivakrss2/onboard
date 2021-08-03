import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from "sweetalert2";
import { AdminService } from '../services/admin.services';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-role-administration',
  templateUrl: './role-administration.component.html',
  styleUrls: ['./role-administration.component.css']
})
export class RoleAdministrationComponent implements OnInit {

  loginData = JSON.parse(localStorage.getItem("login"));
  token = this.loginData["token"];
  roles;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminService
  ) { }

  ngOnInit() {

    /** get the roles from the database and list it */
    this.service.getRoles(this.token)
    .pipe(first())
    .subscribe(
      data => {
        // console.log('roles', data.data.data);
        this.roles = data.data.data;
        this.dtTrigger.next();
      }
    );
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
  }

  /** navigate to add page */
  onAddRole(){
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
        // alert('hi');
      }
    })
  }

  /** navigate to edit page */
  RoleEdit(data){
    let id= data['id'];
    this.router.navigate([id +'/edit'], {relativeTo: this.route});
  }
}
