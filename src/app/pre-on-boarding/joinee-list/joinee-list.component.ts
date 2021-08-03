import { JoineeService } from '../../services/joinee.services';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.services';
import Swal from "sweetalert2";


@Component({
  selector: 'app-joinee-list',
  templateUrl: './joinee-list.component.html',
  styleUrls: ['./joinee-list.component.css']
})


export class JoineeListComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  public values: any = [ ];
  public permission = JSON.parse(localStorage.getItem('permissions'));
  public loginData = JSON.parse  (localStorage.getItem('login'));
  token = this.loginData['token'];
  userId = this.loginData['login']['id'];
  addCandidatePermission: boolean = false;
  updateCandidateViewPermission: boolean = false;
  updateCandidatePermission: boolean = false;
  addSynergyDetailsPermissions: boolean = false;
  moveOnboard: boolean = false;
  onboardMessage: boolean = false;
  showLeadAssigned: boolean = false;

  dtTrigger: Subject<any> = new Subject();
  data:string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: JoineeService,
    private loaderService: LoaderService,
  ) {  }


  onSave($event)
  {
    // console.log('clicked');
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    
    /** check permission for add and update candidate details */
    if(Object.keys(this.permission).length>0){
      // console.log('permission',this.permission['permissions']);

      let addCandidate = this.permission['permissions'].find(x => x.id == 1);
      if(addCandidate != null){
        this.addCandidatePermission = true; 
      }

      let updateCandidateView = this.permission['permissions'].find(x => x.id == 2);
      let updateCandidate = this.permission['permissions'].find(x => x.id == 3);
      if(updateCandidateView != null){
        this.updateCandidateViewPermission = true; 
      }
      if(updateCandidate != null){
        this.updateCandidatePermission = true; 
      }

      /** Add synergy Permission */
      let AddSynergyDetails = this.permission['permissions'].find((x: { id: number; }) => x.id == 10);
      if(AddSynergyDetails != null){
        this.addSynergyDetailsPermissions = true; 
      }

      // let onBoarding = this.permission['permissions'].find((x: { id: number; }) => x.id == 11);
      // if(onBoarding != null){
      //   this.onBoardingPermissions = true; 
      // }
      let generalistRoleId = this.loginData['login']['roles'].find((x: { id: number; }) => x.id == 4);
      if (generalistRoleId != null) {
        this.moveOnboard = true;
      }

    }
    this.loaderService.isLoading.next(true);
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      }; 
    this.getDetails();
  }

  private getDetails(){
     this.service.getDetails(this.token)
      .subscribe(
        data => {
          this.loaderService.isLoading.next(false);
          this.values = data.data;
          let RecuriterRoleId = this.loginData['login']['roles'].find(x => x.id == 2);
          if(RecuriterRoleId != null){
            // let userName = this.loginData['login']['name'];
            this.values = data.data.filter(x => x.created_by == this.userId);  
          // console.log('values', this.values);
          }
          
          let techinicalLeadRoleId = this.loginData['login']['roles'].find(x => x.id == 3);
          if(techinicalLeadRoleId != null){
            this.values = data.data.filter(x => x.techinical_lead_id == this.userId);
          // console.log('checkLead', this.values);
          }
          
          let unitHeadId = this.loginData['login']['roles'].find(x => x.id == 5);
          if(unitHeadId != null){
            this.showLeadAssigned = true;
          }

          this.dtTrigger.next();
          // console.log('values-data', this.values);
        },    
        error => {
          // console.log('error', error);
        } 
      );
  }

  OnCreateJoinee(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  MarketingAssessment()
  {
    this.router.navigate(['marketing_assessment'], {relativeTo: this.route});
  }

  TechinicalAssessment()
  {
    this.router.navigate(['techinical_assessment'], {relativeTo: this.route});
  }
  JoineeEdit(data)
  {
    let id= data['id'];
    // console.log("id ",id);
    // console.log('token',this.token);
    this.router.navigate([id+'/edit'], {relativeTo: this.route});
  } 

  AddSynergyDetails(data){
    let id= data['id'];
    this.router.navigate([id+'/add_synergy_details'], {relativeTo: this.route});
  }

  Onboard(data){

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to move onboard?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        // this.router.navigate(["pre-on-boarding"]);
    //   }
    // })
    // console.log(data);
    this.loaderService.isLoading.next(true);
    this.service.updatecanditateOnboarding(data.id, this.token)
        .subscribe(
          data => {
            this.loaderService.isLoading.next(false);
            // console.log("onboard", data);
              this.service.getDetails(this.token)
              .subscribe(
                data => {
                  this.loaderService.isLoading.next(false);
                  this.values = data.data;
                  let RecuriterRoleId = this.loginData['login']['roles'].find(x => x.id == 2);
                  if(RecuriterRoleId != null){
                    // let userName = this.loginData['login']['name'];
                    this.values = data.data.filter(x => x.created_by == this.userId);  
                  // console.log('values', this.values);
                  }
                  
                  let techinicalLeadRoleId = this.loginData['login']['roles'].find(x => x.id == 3);
                  if(techinicalLeadRoleId != null){
                    this.values = data.data.filter(x => x.techinical_lead_id == this.userId);
                  // console.log('checkLead', this.values);
                  }
                  
                  let unitHeadId = this.loginData['login']['roles'].find(x => x.id == 5);
                  if(unitHeadId != null){
                    this.showLeadAssigned = true;
                  }

                  // console.log('values-data', this.values);
                },    
                error => {
                  // console.log('error', error);
                } 
              );
            if(data.message == "Candidate detail has been updated"){
              // this.onboardMessage = true;
              Swal.fire('Candidate successfully moved to onboard!', '', 'success')
            }
            // window.location.reload();
          },    
          error => {
            // console.log('error', error);
          });
        }
      })
    
  }

  // Onboarding(data){
  //   console.log('data', data);

  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'Do you want to move the employee from onboarding?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes!',
  //     cancelButtonText: 'No'
  //   }).then((result) => {
  //     if (result.value) {
  //        this.loaderService.isLoading.next(true);
  //       this.service.updatecanditateOnboarding(data.id, this.token)
  //       .subscribe(
  //         data => {
  //           this.loaderService.isLoading.next(false);
  //           this.getDetails();
  //           console.log('hii');
            
  //         },    
  //         error => {
  //           console.log('error', error);
  //         } 
  //       );
  //     }
  //   })
  // }

}
