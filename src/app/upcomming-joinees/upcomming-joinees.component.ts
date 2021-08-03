import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.services';
import { JoineeService } from '../services/joinee.services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-upcomming-joinees',
  templateUrl: './upcomming-joinees.component.html',
  styleUrls: ['./upcomming-joinees.component.css']
})
export class UpcommingJoineesComponent implements OnInit {

  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  public values: any = [ ];
  public permission = JSON.parse(localStorage.getItem('permissions'));
  public loginData = JSON.parse  (localStorage.getItem('login'));
  token = this.loginData['token'];
  userId = this.loginData['login']['id'];
  addCandidatePermission: boolean = false;
  updateCandidatePermission: boolean = false;


  dtTrigger: Subject<any> = new Subject();
  data:string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: JoineeService,
    private loaderService: LoaderService,
  ) {  }

  ngOnInit() {

    this.loaderService.isLoading.next(true);
      this.dtOptions = {
        // ajax: 'data/data.json',
        responsive: true,
        pagingType: 'full_numbers',
        pageLength: 10
      };

    /**get the details of the candidates */
     this.service.getDetails(this.token)
      .subscribe(
        (data) => {
          this.loaderService.isLoading.next(false);
          this.values = data.data;         
          this.dtTrigger.next();
          // console.log('values-data', this.values);
        },    
        (error) => {
          // console.log('error', error);
        } 
      );
  }

}
