import { JoineeService } from "../../services/joinee.services";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
  ValidatorFn
} from "@angular/forms";
import { Component, OnInit, ComponentRef, ViewChild, ElementRef,OnChanges } from "@angular/core";
import { first, flatMap } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { LoaderService } from "src/app/services/loader.services";

@Component({
  selector: "app-new-joinee",
  templateUrl: "./new-joinee.component.html",
  styleUrls: ["./new-joinee.component.css"]
})



export class NewJoineeComponent implements OnInit {
  
  @ViewChild('contractInputFile', { static: true })
  myInputVariable1: ElementRef;
  public joinee_details: any = {};
  public testJson: any = {};
  public myGroup: any = [];
  public date_of_birth: any;
  public date_of_join: any;
  public resume_id: any;
  public resume_name: string;
  public resume_path: any;
  public candidate_accomodation: any;
  public get_document: any;
  public get_techinical_document: any;
  public login = JSON.parse(localStorage.getItem('login'));
  public permission = JSON.parse(localStorage.getItem('permissions'));
  isEdit: boolean;
  addMessageSucess: boolean;
  addMessageError: boolean;
  resumeMessageError: boolean;
  updateMessageSucess: boolean;
  updateDocumentMessageFailure: boolean;
  updateDocumentMessageSucess: boolean;
  updateTechinicalDocumentMessageSucess: boolean;
  updateTechinicalDocumentMessageFailure: boolean;
  deleteParticularDocumentMessage: boolean;
  deleteAllDocumentMessage: boolean;
  deleteTechDetailMessage: boolean;
  isLanguageDisabled = true;
  isShownConsultant: boolean = false;
  coldCallingStatus: any;
  joineeContractFile: any;
  joineeContractFile1: boolean = true;
  joineeCommitmentFile: any;
  joineeCommitmentFile1: boolean = true;
  joineeSalaryFile: any;
  joineeSalaryFile1: boolean = true;
  userName: any;
  viewJoineeDetails: boolean = true;
  viewJoineeFormDetails: boolean = false;
  joineeDetailsDisabled: boolean = false;
  joineeDetailShow: boolean = false;
  joineeDetailView: boolean = true;
  onBoardingPermissions: boolean = false;
  updateCandidateSubmitPermission: boolean = false;
  addJoineeDocumentPermission: boolean = false;
  addTechinicalTaskPermission: boolean = false;
  viewJoineeDocumentPermission: boolean = false;
  viewTechinicalDocumentPermission: boolean = false;
  consultantleadTask: boolean = false;
  trainingleadTask: boolean = false;
  consultantleadTaskAssign: boolean = false;
  trainingleadTaskAssign: boolean = false;
  consultantleadTaskForm: boolean = false;
  trainingleadTaskForm: boolean = false;
  showResume: boolean = true;
  showLeadName: boolean = true;
  showResumeDownload: boolean = false;
  changeResume: boolean = false;
  showSystemRequirements: boolean = false;
  showJoineeLinkCheckbox: boolean = false;
  consultantButtonClicked: boolean = false;
  trainingButtonClicked: boolean = false;
  file_detail_present: boolean = false;
  joinee_link_check_box: boolean = false;
  resume_download: boolean = true;
  contract_file;
  joining_commitement_file;
  salary_breakup_file;
  fileUrl: any;
  consultantTask;
  trainingTask;
  consultantDetails;
  trainingDetails;
  doc_data_display: any = {};
  joinee_document_details;
  joinee_details_files: Array<any> = [];
  doc_files;
  max_date;
  guid;
  closeTimeOpen : boolean = true;
  hide_send_mail: boolean = false;


  // to get file names
  photoName;
  aadhar;
  pancard;
  passport;
  offer;
  relieve;
  experience;
  form_16;
  payslip;
  salary_cert;

  // for Multiple file uploads 

  salary_certificate : any = [];
  payslipArr :any =[];
  payslipArrObj : any;
  offerArr :any =[];
  relieveArr :any =[];
  experienceArr: any=[];

  /// for Ids 
  photoId;
  aadharId;
  pancardId;
  passportId;
  form_16Id;


  // for reason
  photoReason;
  aadharReason;
  pancardReason;
  passportReason;
  offerReason;
  relieveReason;
  experienceReason;
  form_16Reason;
  payslipReason;
  salary_certReason;



  showModal: boolean;
  showTechinicalModal: boolean;
  content: string;
  title: string;
  




  fileData: File = null;
  resumeFile: string[] = [];
  selectedFile: any = [];
  myFiles: any = [];
  myTechFiles: string[] = [];
  getdocument: any = [];
  
  id: number;
  editMode = true;
  mailStatus = false;
  mailStatusShow = false;
  departments;
  designations;
  // departments = [
  //   { id: 1, department: "Test" },
  //   { id: 2, department: "Development" }
  // ];
  // designations = [
  //   { id: 1, designation: "Junior software developer" },
  //   { id: 2, designation: "Software developer" },
  //   { id: 3, designation: "Associate group lead" }
  // ];
  companyNames = [
    { id: 1, name: "CG-vak" },
    { id: 2, name: "G2 Solutions" }
  ];

  failedMails:any;
  joinee_document_type = "1";
  joinee_tech_document_type = "2";
  loginData = JSON.parse(localStorage.getItem("login"));
  token = this.loginData["token"];
  userId = this.loginData['login']["id"];
  leads: any;
  requirements: any;
  document_title: any;
  files123: any;
  joinee_id;
  assigned_consultant_work_value;
  commitment_agreement_value;
  joining_agreement_value;
  candidate_accomodation_value;

  contract_value;
  joining_commitement_value;
  salary_break_up_value;
  joining_bonus_value;
  back_up_lead_value;

  contract_comment_value;
  joining_commitement_comment_value;
  salary_break_up_comment_value;
  joining_bonus_comment_value;
  back_up_lead_comment_value;

  joineeDetails: FormGroup;
  joineeDocuments: FormGroup;
  joineeTechinicalDocument: FormGroup;
  joineeConsultantTechinicalDocument: FormGroup;
  joineeTrainingTechinicalDocument: FormGroup;
  joineeCandidateDetails: FormGroup;
  joineeCandidatePersonalReferenceDetails: FormGroup;
  joineeCandidateProfessionalReferenceDetails: FormGroup;
  joineeCandidatePreviousCompany: FormGroup;
  uploadDocuments: FormGroup;
  private form: any;

  today = new Date();
  dd = this.today.getDate();
  mm = this.today.getMonth() + 1; //January is 0!
  set_date;
  set_month;







    // for Candidate's marital status.
    CandidateMarried: boolean;
    child: boolean;
    candidateChildInfo:any;


    get childDetails(){
      return this.joineeCandidateDetails.get('childDetails') as FormArray;
    }

    addChildForm(name,gender,dob){
    const childDetailsLength =  this.childDetails.length;
    const newChildDetails =   this._formBuilder.group({
        childName: new FormControl(name),
        childGender: new FormControl(gender),
        childDOB:new FormControl(dob)
      })

      this.childDetails.push(newChildDetails);
      // console.log(childDetailsLength);
      
    }


    removeChildForm(i){
      // console.log(i);
      this.childDetails.removeAt(i)
      
    }


    //Candidate's personal reference

    get refercenceDetails(){
      return this.joineeCandidatePersonalReferenceDetails.get('refercenceDetails') as FormArray;
    }

    addPersonalReferenceForm(name,designation,company,phno,email,relation){
      const newRefercenceDetails = this._formBuilder.group({
          referenceName: new FormControl(name),
          referenceDesignation: new FormControl(designation),
          referenceCompanyName: new FormControl(company),
          referencePhoneNumber: new FormControl(phno),
          referemceEmail: new FormControl(email),
          referenceRelation: new FormControl(relation),
      });

      this.refercenceDetails.push(newRefercenceDetails);
    }

    removePersonalReferenceForm(i){
      this.refercenceDetails.removeAt(i);
    }

    //Candidate's professional reference
    get professionalRefercenceDetails(){
      return this.joineeCandidateProfessionalReferenceDetails.get('professionalRefercenceDetails') as FormArray;
    }

    addProfessionalReferenceForm(name,designation,company,phno,email,relation){
      const newProfessionalRefercenceDetails = this._formBuilder.group({
            professionalReferenceName: new FormControl(name),
            professionalReferenceDesignation: new FormControl(designation),
            professionalReferenceCompanyName: new FormControl(company),
            professionalReferencePhoneNumber: new FormControl(phno),
            professionalReferenceEmail: new FormControl(email),
            professionalReferenceRelation: new FormControl(relation),

      })

      this.professionalRefercenceDetails.push(newProfessionalRefercenceDetails);
    }

    removeProfessionalReferenceForm(i){
      this.professionalRefercenceDetails.removeAt(i);
    }


    //Candidate Previous Company Information
    get companyInformation(){
      return this.joineeCandidatePreviousCompany.get('companyInformation') as FormArray;
    }


    addPreviousCompanyFrom(hrName,hrDesignation,hrPhoneNumber,hrEmail,reportingAuthorityName,reportingAuthorityDesination,reportingAuthorityPhoneNumber,reportingAuthorityEmail){
      const newPreviousCompany = this._formBuilder.group({
            hrName: new FormControl(hrName),
            hrDesignation: new FormControl(hrDesignation),
            hrPhoneNumber: new FormControl(hrPhoneNumber),
            hrEmail: new FormControl(hrEmail),
            reportingAuthorityName: new FormControl(reportingAuthorityName),
            reportingAuthorityDesination: new FormControl(reportingAuthorityDesination),
            reportingAuthorityPhoneNumber: new FormControl(reportingAuthorityPhoneNumber),
            reportingAuthorityEmail: new FormControl(reportingAuthorityEmail),
      });

      this.companyInformation.push(newPreviousCompany);
    }

    removePreviousCompanyForm(i){
      this.companyInformation.removeAt(i);
    }




  // openTime = new FormControl(new Date());
  // closeTime = new FormControl(new Date());
  minDate = new Date();
  changed= true;

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: JoineeService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private loaderService: LoaderService,
  ) {
    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  ngOnInit() {
    /** candidate update Permission */
    let CandidateSubmitPermission = this.permission['permissions'].find((x: { id: number; }) => x.id == 3);
      if(CandidateSubmitPermission != null){
        this.updateCandidateSubmitPermission = true; 
      }

     /** joinee document update Permission */
     let JoineeDocumentPermission = this.permission['permissions'].find((x: { id: number; }) => x.id == 4);
     if(JoineeDocumentPermission != null){
       this.addJoineeDocumentPermission = true; 
     }

     /** techinical task update Permission */
     let TechinicalDocumentPermission = this.permission['permissions'].find((x: { id: number; }) => x.id == 5);
     let generalistRoleId = this.login['login']['roles'].find((x: { id: number; }) => x.id == 4);
     let techinicalLeadRoleId = this.login['login']['roles'].find((x: { id: number; }) => x.id == 3);
     let systemAdminRoleId = this.login['login']['roles'].find((x: { id: number; }) => x.id == 6);
     let recruiterRoleId = this.login['login']['roles'].find((x: { id: number; }) => x.id == 2);
     if(recruiterRoleId != null){
      this.changeResume = true;
     }
      if(systemAdminRoleId != null){
        this.viewJoineeDetails = false; 
        this.joineeDetailsDisabled = true;
        this.showSystemRequirements = true;
        this.joineeDetailView = false;
        this.showResume = false;
      }
     if(TechinicalDocumentPermission != null){
      this.viewJoineeDetails = false;
      this.joineeDetailsDisabled = true;
      this.showLeadName = false;
      this.showResumeDownload = true;
      this.changeResume = false;
        if(generalistRoleId != null){
          this.viewJoineeFormDetails = true;
          this.viewJoineeDetails = true;
          this.joineeDetailsDisabled = false;
          this.showLeadName = true;
          this.showResumeDownload = true;
          this.changeResume = true;
          this.showSystemRequirements = false;
          this.showJoineeLinkCheckbox = true;
          this.mailStatusShow = true;
        }
        if(techinicalLeadRoleId != null){
          this.showSystemRequirements = true;
        }
       this.addTechinicalTaskPermission = true; 
     }

     /** joinee document view Permission */
     let JoineeDocumentViewPermission = this.permission['permissions'].find((x: { id: number; }) => x.id == 6);
     if(JoineeDocumentViewPermission != null){
       this.viewJoineeDocumentPermission = true; 
     }

     /** techinical task view Permission */
     let TechinicalDocumentViewPermission = this.permission['permissions'].find((x: { id: number; }) => x.id == 7);
     if(TechinicalDocumentViewPermission != null){
       this.viewTechinicalDocumentPermission = true; 
     }

     /** techinical lead and buddy coach assign Permission */
     let TechinicalLeadAssignPermission = this.permission['permissions'].find((x: { id: number; }) => x.id == 8);
     if(TechinicalLeadAssignPermission != null){
      this.viewJoineeDetails = false; 
      this.joineeDetailsDisabled = true;
      this.joineeDetailShow = true;
      this.showResumeDownload = true;
      this.changeResume = false;
     }

     let onBoarding = this.permission['permissions'].find((x: { id: number; }) => x.id == 11);
      if(onBoarding != null){
        this.onBoardingPermissions = true; 
      }

      var url = this.router.url;
      if(url == "/pre-on-boarding/new"){
        this.addJoineeDocumentPermission = false;
        this.addTechinicalTaskPermission = false;
      }
      

       /** Age restriction for DOB */
       
      // this.max_date = new Date (2017, 1, 1);
      var yyyy = this.today.getFullYear() -18;
      this.set_date = this.dd;
      // console.log('yyyy', yyyy);
      // console.log('this.set_date', this.set_date);
      // console.log('this.mm', this.mm);
      
      if (this.dd < 10) {
         this.set_date = '0' + this.dd;
      } 
      this.set_month = this.mm;
      if (this.mm < 10) {
        this.set_month = '0' + this.mm;
      } 
      this.max_date = new Date (yyyy, this.set_month, this.set_date);
      // this.max_date = new Date (yyyy);
      // console.log('max-dates', this.max_date);
      

     /** get the user name */
     this.userName = this.login['login']['name'];
     
     /** display department names */
    this.service
    .getDepartmentDetails(this.token)
    .pipe(first())
    .subscribe(
      data => {
        this.departments = data.data;
        // console.log("getDepartmentDetails ", this.departments);
      },
      error => {
        // console.log("error", error);
      }
    );

    /** display designations names */
    this.service
      .getDesignationDetails(this.token)
      .pipe(first())
      .subscribe(
        data => {
          this.designations = data.data;
          // console.log("getDesignationDetails ",this.designations);
        },
        error => {
          // console.log("error", error);
        }
      );


    /** display project lead */
    this.service
      .getLeads(this.token)
      .pipe(first())
      .subscribe(
        data => {
          this.leads = data.data;
          // console.log("leads ", this.leads);
        },
        error => {
          // console.log("error", error);
        }
      );

    /** get the requirements */
    this.service
      .GetRequirement(this.token)
      .pipe(first())
      .subscribe(
        data => {
          this.requirements = data;
          // console.log("requirement ", this.requirements);
        },
        error => {
          // console.log("error", error);
        }
      );

      // this.joinee_details = [{
      //   department_id : 9
      // }]

    this.isEdit = true;
    // console.log("this.isEdit", this.isEdit);
    this.route.params.subscribe((params: Params) => {
      // console.log("params ", params.id);
      this.joinee_id = params.id;
      if (params.id) {
        this.mailStatus = true;
        this.isEdit = false;
        // console.log("this.isEdit", this.isEdit);
        /**
         * *displat the details to the user
         */
        this.loaderService.isLoading.next(true);
        this.service.getcanditateDetails(this.token, params.id).subscribe(
          getcanditateDetails => {
            this.loaderService.isLoading.next(false);
            this.joinee_details = getcanditateDetails["data"][0];
            // console.log(" this.joinee_details", this.joinee_details);
            // console.log(" this.joinee_details123", this.joinee_details.is_link_disabled);

            this.guid = this.joinee_details.guid;
            // console.log("guid",this.guid);



          /** get the requirements */
          this.service
          .getJoineeInfoDetails(this.guid)
          .pipe(first())
          .subscribe(
            data => {
              // console.log("data_guid ", data);
              // console.log("Candidate details ", data.data);
              // console.log("Candidate details ", data.data['joinee_personal_info']);

              //if no file is submitted

              this.photoName = "No file";
              this.aadhar ="No file";
              this.pancard ="No file";
              this.passport ="No file";
              this.offer ="No file";
              this.relieve ="No file";
              this.experience ="No file";
              this.form_16 ="No file";
              this.payslip ="No file";
              this.salary_cert ="No file";

            //checking every submitted file and getting file_name, type and Ids from it

              data.data.joinee_documents.forEach(record => {
                switch (record.type) {
                  case 1:
                    this.photoId = record.id;
                    // console.log("photo",record.file_name);
                    if(record.file_name !== null){
                      this.photoName = record.file_name;
                    }
                    
                    this.photoReason = record.reason;
                    // console.log("photoReason",this.photoReason);
                    break;
                  case 2:
                      this.aadharId = record.id;
                      // console.log("aadhar",record.file_name);
                      if(record.file_name !== null){
                        this.aadhar = record.file_name;
                      }

                      this.aadharReason = record.reason;
                      // console.log("aadharReason",this.aadharReason);
                      break;
                  case 3:
                      this.pancardId = record.id;
                      // console.log("pancard",record.file_name);
                      if(record.file_name !== null){
                        this.pancard = record.file_name;
                      }

                      this.pancardReason = record.reason;
                      // console.log("pancardReason",this.pancardReason);
                      break;
                 case 4:
                      this.passportId = record.id;
                      // console.log("passport",record.file_name);
                      if(record.file_name !== null){
                        this.passport = record.file_name;
                      }

                      this.passportReason = record.reason;
                      // console.log("passportReason",this.passportReason);
                      break;
                  case 5:
                    if(record.file_name !== null){
                      var newArray = [{
                        id : record.id,
                        file_name : record.file_name,
                        type:record.type
                      }];
                      this.offerArr.push(newArray);
                      // console.log("Offer",this.offerArr);
                    } 
                      this.offerReason = record.reason;
                      // console.log("offerReason",this.offerReason);
                      break;
                  case 6:
                     
                      if(record.file_name !== null){
                        var newArray = [{
                          id : record.id,
                          file_name : record.file_name,
                          type:record.type
                        }];
                        this.relieveArr.push(newArray);
                        // console.log("relieve",this.relieveArr);
                      }

                      this.relieveReason = record.reason;
                      // console.log("relieveReason",this.relieveReason);
                      break;
                  case 7:

                    if(record.file_name !== null){
                      var newArray = [{
                        id : record.id,
                        file_name : record.file_name,
                        type:record.type
                      }];

                      this.experienceArr.push(newArray);
                      // console.log("experience",this.experienceArr);
                    }
                      this.experienceReason = record.reason;
                      // console.log("experienceReason",this.experienceReason);
                      break;     
                  case 8:
                      this.form_16Id = record.id;  

                      if(record.file_name !== null){
                        this.form_16 = record.file_name;
                        

                      }

                      this.form_16Reason = record.reason;
                      // console.log("form_16Reason",this.form_16Reason);
                      break;
                  case 9:
                    if(record.file_name !== null){
                      var newArray = [{
                        id : record.id,
                        file_name : record.file_name,
                        type:record.type
                      }];

                      this.payslipArr.push(newArray)
                      
                      // console.log("payslip",this.payslipArr);
                    } 
                      this.payslipReason = record.reason;
                      // console.log("payslipReason",this.payslipReason);
                      break;
                  case 10:
                      if(record.file_name !== null){
                       var newArray = [{
                           id : record.id,
                           file_name : record.file_name,
                            type:record.type
                          }];
                       this.salary_certificate.push(newArray);
                      //  console.log('salary', this.salary_certificate );
                      }
                      this.salary_certReason = record.reason;
                      // console.log("salary_certReason",this.salary_certReason);
                      break;          
                }

                
              });

              // console.log('out of switch salary_certificate',this.salary_certificate);
              // console.log('out of switch payslipArr',this.payslipArr);
              // console.log('out of switch offerArr',this.offerArr);
              // console.log('out of switch experienceArr',this.experienceArr);
              // console.log('out of switch relieveArr',this.relieveArr);

              if(data.data['joinee_personal_info'].length){
                  //Entering Candidate details in the joineeCandidateDetails form
                  this.joineeCandidateDetails
                  .get('firstName')
                  .setValue(data.data.joinee_personal_info['0'].first_name);
                  
                  this.joineeCandidateDetails
                  .get('lastName')
                  .setValue(data.data.joinee_personal_info['0'].last_name);

                  this.joineeCandidateDetails
                  .get('contactNumber')
                  .setValue(data.data.joinee_personal_info['0'].contact_number);

                  this.joineeCandidateDetails
                  .get('alternateNumber')
                  .setValue(data.data.joinee_personal_info['0'].alternate_number);

                  this.joineeCandidateDetails
                  .get('fatherName')
                  .setValue(data.data.joinee_personal_info['0'].father_name);

                  this.joineeCandidateDetails
                  .get('fatherNumber')
                  .setValue(data.data.joinee_personal_info['0'].father_contact_number);

                  this.joineeCandidateDetails
                  .get('motherName')
                  .setValue(data.data.joinee_personal_info['0'].mother_name);

                  this.joineeCandidateDetails
                  .get('motherNumber')
                  .setValue(data.data.joinee_personal_info['0'].mother_contact_number);

                  this.joineeCandidateDetails
                  .get('presentAddress')
                  .setValue(data.data.joinee_personal_info['0'].present_address);

                  this.joineeCandidateDetails
                  .get('permanentAddress')
                  .setValue(data.data.joinee_personal_info['0'].permanent_address);

                  this.joineeCandidateDetails
                  .get('DOB')
                  .setValue(data.data.joinee_personal_info['0'].date_of_birth);

                  this.joineeCandidateDetails
                  .get('DOJ')
                  .setValue(data.data.joinee_personal_info['0'].date_of_join);

                  this.joineeCandidateDetails
                  .get('bloodGroup')
                  .setValue(data.data.joinee_personal_info['0'].blood_group);
                  

                  this.joineeCandidateDetails
                  .get('emailAddress')
                  .setValue(data.data.joinee_personal_info['0'].email);
                  

                  this.joineeCandidateDetails
                  .get('uan')
                  .setValue(data.data.joinee_personal_info['0'].uan_no);

                  this.joineeCandidateDetails
                  .get('landMark')
                  .setValue(data.data.joinee_personal_info['0'].landmark);

                  //checking the marital status of the candidata and if married -
                  //get the details of spouse and children

                  if(data.data.joinee_personal_info['0'].marital_status){
                    this.CandidateMarried = true
                    this.joineeCandidateDetails
                  .get('spouseName')
                  .setValue(data.data.joinee_personal_info['0'].spouse_name);

                  this.joineeCandidateDetails
                  .get('spousePhoneNumber')
                  .setValue(data.data.joinee_personal_info['0'].spouse_contact_number);

                  this.joineeCandidateDetails
                  .get('spouseDOB')
                  .setValue(data.data.joinee_personal_info['0'].spouse_dob);

                  
                  }else{
                    this.CandidateMarried = false
                  }

                  if(data.data.joinee_personal_info['0'].child){
                    this.child = true
                    // console.log("Child Info",data.data.joinee_child_info);

                    data.data.joinee_child_info.forEach(record => {
                      // console.log("children",record.child_name);
                      this.addChildForm(record.child_name,record.child_gender,record.child_dob);
                    });
                    
                  }else{
                    this.child = false
                  }

                  //getting the personal references and printing it in forms with respect to the no. of references submitted

                  data.data.joinee_personal_reference.forEach(record =>{
                    this.addPersonalReferenceForm(record.name,record.designation,record.company_name,record.phone_no,record.email,record.relation);
                  })

                  //getting the professional references and printing it in forms with respect to the no. of references submitted

                  data.data.joinee_professional_reference.forEach(record =>{
                    this.addProfessionalReferenceForm(record.name,record.designation,record.company_name,record.phone_no,record.email,record.relation);
                  })

                  //getting the previous company info and printing it in forms
                  data.data.joinee_previous_company.forEach(record =>{
                    this.addPreviousCompanyFrom(record.hr_name,record.hr_designation,record.hr_phone_no,record.hr_email,record.ra_name,record.ra_designation,record.ra_phone_no,record.ra_email);
                  })


            }
              
            },
            error => {
              // console.log("error", error);
            }
          );
            
            this.selectChange(this.joinee_details.department_id);

            this.joineeDetails
              .get("requirement_lead_id")
              .setValue(+this.joinee_details["requirement_lead_id"]);
            
            this.joineeDetails
              .get("requirement_type")
              .setValue(+this.joinee_details["requirement_type"]);
              if(this.joinee_details["techinical_lead_id"] != 0){
                this.joineeDetails
              .get("techinical_lead_id")
              .setValue(+this.joinee_details["techinical_lead_id"]);
              }
              if(this.joinee_details["buddy_coach_id"] != 0){
                this.joineeDetails
              .get("buddy_coach_id")
              .setValue(+this.joinee_details["buddy_coach_id"]);
              }
              this.resume_name = "No file";
              if(this.joinee_details["resume"].length > 0){
                this.resume_id = this.joinee_details["resume"][0]["id"];
                if(this.joinee_details["resume"][0]["resume_name"] != null){
                    this.resume_name = this.joinee_details["resume"][0]["resume_name"];
                    this.resume_download = false;
                }
              }

              
              // if(this.joineeDetails[""])
            // this.resume_name = this.resume_name.split("_").pop();
            if(this.joinee_details["is_link_disabled"] == 1){
              this.joinee_link_check_box = true;
            }
            // console.log('work', this.joinee_details["assigned_consultant_work"].toString());
            this.assigned_consultant_work_value = this.joinee_details["assigned_consultant_work"].toString();
            this.commitment_agreement_value = this.joinee_details["commitment_agreement"].toString();
            this.joining_agreement_value = this.joinee_details["joining_agreement"].toString();
            this.candidate_accomodation_value = this.joinee_details["assigned_consultant_work"].toString();
            

            let coldCallingStatus = this.joinee_details["cold_calling_status"];

            if(this.joinee_details["assigned_consultant_work"] == 1){
              this.isShownConsultant = true;
              this.joineeDetails
              .get("consultant_lead_id")
              .setValue(+this.joinee_details["consultant_lead_id"]);
            }

            /** display cold call status */
            const cold_call_status = this.joineeDetails.controls
              .cold_call_status as FormArray;
            this.onRemovecallStatus(0);
            coldCallingStatus.forEach((elem: { id: any; status_date: any; status: any; }) => {
              cold_call_status.push(
                this.fb.group({
                  status_id: [elem.id],
                  status_date: [elem.status_date, [Validators.required]],
                  status: [elem.status, [Validators.required]]
                })
              );
            });
            // console.log(" coldCallingStatus", this.coldCallingStatus);
          },
          error => {
            // console.log("error", error);
          }
        );

        /** get the joinee document details */
        this.service.getDocument(this.token, params.id).subscribe(
          data => {
            // console.log("get-doc-data", data);
              this.doc_files = data.data["file_details"]; 
              if(this.doc_files != undefined){
                this.hide_send_mail = true;
              } else {
                this.hide_send_mail = false;
              }
          },
          error => {
            // console.log("doc-error", error);
          }
        );
        
      }
      (this.id = +params["id"]), (this.editMode = params["id"] !== null);
      this.initForm();
    });

    // Get failed mails call
    this.onGetFailedMails();
  } 

  selectChange(department_id){
    /** display Department Designations names */
    this.service
    .particularDepartmentDesignationDetails(this.token, department_id)
    .pipe(first())
    .subscribe(
      data => {
        this.designations = data.data;
        // console.log("getDesignationDetails ",this.designations);
      },
      error => {
        // console.log("error", error);
      }
    );
    }

  private initForm() {
    this.joineeDetails = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      department_id: new FormControl(null, Validators.required),
      designation_id: new FormControl(null, Validators.required),
      doj: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      father_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email_id: new FormControl(null, [Validators.required, Validators.email]),
      skype_id: new FormControl(null),
      commitment_agreement: new FormControl(null, [Validators.required]),
      techinical_lead_id: new FormControl(null),
      buddy_coach_id: new FormControl(null),
      system_requirements: new FormControl(null),
      assigned_consultant_work: new FormControl(null, [Validators.required]),
      joinee_link_disabled: new FormControl(null),
      linkCloseTime: new FormControl(null),
      joining_agreement: new FormControl(null, [Validators.required]),
      recruiter_name: new FormControl(null, [Validators.required]),
      requirement_detail: new FormControl(null, [Validators.required]),
      requirement_type: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      candidate_accomodation: new FormControl(null, [Validators.required]),
      contact_number: new FormControl(null, [
        Validators.required,
        Validators.minLength(10)
      ]),
      alternate_number: new FormControl(null),
      requirement_lead_id: new FormControl(null, Validators.required),
      consultant_lead_id: new FormControl(null),
      resume: new FormControl(null),
      cold_call_status: this.fb.array([this.onAddCold_call_status_FormGroup()])
    });

    this.joineeDocuments = new FormGroup({
      id: new FormControl(null),
      send_mail: new FormControl(null),
      contract: new FormControl(null, [Validators.required]),
      contractComment: new FormControl(null),
      ContractFile: new FormControl(null),
      joiningCommitement: new FormControl(null, [Validators.required]),
      joiningCommitementComment: new FormControl(null),
      joiningCommitementFile: new FormControl(null),
      salaryBreakUp: new FormControl(null, [Validators.required]),
      salaryBreakUpComment: new FormControl(null),
      salaryBreakUpFile: new FormControl(null),
      joiningBonus: new FormControl(null, [Validators.required]),
      joiningBonusComment: new FormControl(null),
      backUpLead: new FormControl(null, [Validators.required]),
      backUpLeadComment: new FormControl(null),
      openTime: new FormControl(null),
      closeTime: new FormControl(null)
    },
    [Validators.required, this.dateRangeValidator]
    );
    

    
    this.joineeConsultantTechinicalDocument = new FormGroup({
      clientName: new FormControl(null, [Validators.required]),
      taskAssigned: new FormControl(null),
      taskDetails: new FormControl(null),
      taskStartDate: new FormControl(null),
      taskCompletetDate: new FormControl(null),
      taskStatus: new FormControl(null)
    });

    this.joineeTrainingTechinicalDocument = new FormGroup({
      taskAssigned: new FormControl(null),
      taskDetails: new FormControl(null),
      taskStartDate: new FormControl(null),
      taskCompletetDate: new FormControl(null),
      taskStatus: new FormControl(null)
    });
    
    this.joineeCandidateDetails = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      contactNumber: new FormControl(''),
      alternateNumber: new FormControl(''),
      fatherName: new FormControl(''),
      fatherNumber: new FormControl(''),
      motherName: new FormControl(''),
      motherNumber: new FormControl(''),
      presentAddress: new FormControl(''),
      permanentAddress: new FormControl(''),
      DOB : new FormControl(''),
      DOJ:new FormControl(''),
      bloodGroup: new FormControl(''),
      emailAddress:new FormControl(''),
      uan:new FormControl(''),
      landMark:new FormControl(''),
      maritalStatus: new FormControl(''),
      spouseName: new FormControl(''),
      spousePhoneNumber: new FormControl(''),
      spouseDOB: new FormControl(''),
      childDetails : new FormArray([])
    });

    this.joineeCandidatePersonalReferenceDetails = new FormGroup({
      refercenceDetails:new FormArray([])
    })

    this.joineeCandidateProfessionalReferenceDetails = new FormGroup({
      professionalRefercenceDetails:new FormArray([])
    })

    this.joineeCandidatePreviousCompany= new FormGroup({
      companyInformation: new FormArray([])
    });

    
    this.uploadDocuments = new FormGroup({
      photo : new FormControl(''),
      aadhar_card: new FormControl(''),
      pan_card: new FormControl(''),
      passport: new FormControl(''),
      form_16: new FormControl(''),

    })
    

  }

  

  // get closeTime() {
  //   console.log(this.dateRangeValidator);
    
  //   return this.dateRangeValidator;
  // }


  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const openTime = this.joineeDocuments && this.joineeDocuments.get("openTime").value;
    const closeTime = this.joineeDocuments && this.joineeDocuments.get("closeTime").value;
    if (openTime && closeTime) {
      invalid = new Date(openTime).valueOf() > new Date(closeTime).valueOf();
    }
    return invalid ? { invalidRange: { openTime, closeTime } } : null;
  };

  checkOpentime(){
    this.closeTimeOpen = false;
  }


  /**validate Cold_call_status */
  onAddCold_call_status_FormGroup(): FormGroup {
    return this.fb.group({
      status_id: [""],
      status_date: ["", Validators.required],
      status: ["", Validators.required]
    });
  }
  

  /**Add Cold_call_status */
  onAddStatus(): void {
    const cold_call_status = this.joineeDetails.controls
      .cold_call_status as FormArray;
    cold_call_status.push(this.onAddCold_call_status_FormGroup());
  }

  /**Remove Cold_call_status */
  onRemovecallStatus(index: number) {
    (<FormArray>this.joineeDetails.get("cold_call_status")).removeAt(index);
  }

  /**validate Techinical Joinee Document */
  onAddTechinicalDocument_FormGroup(): FormGroup {
    return this.fb.group({
      document_type: [""],
      id: [""],
      document_title: ["", Validators.required],
      file_input: ["", Validators.required]
    });
  }

  get joineeId() {
    return this.joineeDetails.get("id");
  }
  get joineeName() {
    return this.joineeDetails.get("name");
  }
  get joineeDepartment() {
    return this.joineeDetails.get("department_id");
  }
  get joineeDesignation() {
    return this.joineeDetails.get("designation_id");
  }
  get dateOfJoining() {
    return this.joineeDetails.get("doj");
  }
  get dateOfBirth() {
    return this.joineeDetails.get("dob");
  }
  get fatherName() {
    return this.joineeDetails.get("father_name");
  }
  get email() {
    return this.joineeDetails.get("email_id");
  }
  get cold_call_status() {
    return this.joineeDetails.get("cold_call_status");
  }
  get comitmentAgreement() {
    return this.joineeDetails.get("commitment_agreement");
  }
  get joiningAgreement() {
    return this.joineeDetails.get("joining_agreement");
  }
  get recruitersName() {
    return this.joineeDetails.get("recruiter_name");
  }
  get requirementDetail() {
    return this.joineeDetails.get("requirement_detail");
  }
  get requirementType() {
    return this.joineeDetails.get("requirement_type");
  }
  get candidateLocation() {
    return this.joineeDetails.get("location");
  }
  get contactNumber() {
    return this.joineeDetails.get("contact_number");
  }
  get requirmentLead() {
    return this.joineeDetails.get("requirement_lead_id");
  }

  /** joinee Consultant Techinical document validation */

  get clientName() {
    return this.joineeConsultantTechinicalDocument.get("clientName");
  }

  onResumeSelected(fileInput: any) {
    this.resume_name = fileInput[0]['name'];
    for (var i = 0; i < fileInput.length; i++) {
      this.resumeFile.push(fileInput[i]);
        if(this.resumeFile.length > 1){
          this.resumeFile.shift();
        }
    }
    // console.log("File is ", this.resumeFile);
  }

  systemReqSubmit()
  {
    const token = this.loginData["token"];
    // console.log("test", this.joineeDetails["value"]);
    this.loaderService.isLoading.next(true);
    this.service
          .updateCanditateSysReqDetails(
            this.joineeDetails["value"]["id"],
            token,
            this.joineeDetails["value"]
          )
          .pipe(first())
          .subscribe(
            data => {
              // console.log("update-sys-req-details ", data);
              this.loaderService.isLoading.next(false);
               // this.updateMessageSucess = true;
               Swal.fire(' Candidate details have been updated successfully!','', 'success');
            },
            error => {
              // console.log("error", error);
              this.loaderService.isLoading.next(false);
            }
          );
  }

  leadDetailSubmit()
  {
    const token = this.loginData["token"];
    // console.log("test", this.joineeDetails["value"]);
    this.loaderService.isLoading.next(true);
    this.service
          .updateCanditateLeadDetails(
            this.joineeDetails["value"]["id"],
            token,
            this.joineeDetails["value"]
          )
          .pipe(first())
          .subscribe(
            data => {
              // console.log("update-details ", data);
              this.loaderService.isLoading.next(false);
               // this.updateMessageSucess = true;
               Swal.fire(' Candidate details have been updated successfully!','', 'success');
            },
            error => {
              // console.log("error", error);
              this.loaderService.isLoading.next(false);
            }
          );
  }

  /**Candidate details add */
  onSubmit() {
    // console.log("test", this.joineeDetails["value"]);
    this.addMessageSucess = false;
    this.addMessageError = false;
    this.resumeMessageError = false;
    this.updateMessageSucess = false;
    if (this.joineeDetails.valid) {
      const token = this.loginData["token"];

      if (this.joineeDetails["value"]["id"]) {
        // console.log("Id is ", this.joineeDetails["value"]);
        let updateFormdata = new FormData();
        updateFormdata.append("created_by", this.userId);
        for (const key in this.joineeDetails["value"]) {
          if (key == "cold_call_status") {
            this.joineeDetails["value"][key].forEach((elem: { [x: string]: string | Blob; }, index: string) => {
              updateFormdata.append(
                "cold_call_status[" + index + "][status_date]",
                elem["status_date"]
              );
              updateFormdata.append(
                "cold_call_status[" + index + "][status]",
                elem["status"]
              );
            });
          } else if (key == "resume") {
            for (var i = 0; i < this.resumeFile.length; i++) {
            // console.log('hii', this.resumeFile);
              updateFormdata.append("resume", this.resumeFile[i]);
            }
          } else {
            updateFormdata.append(key, this.joineeDetails["value"][key]);
          }
        }
        // console.log("updateFormdata", updateFormdata);
        this.loaderService.isLoading.next(true);
        this.service
          .updatecanditateDetails(
            this.joineeDetails["value"]["id"],
            token,
            updateFormdata
          )
          .pipe(first())
          .subscribe(
            data => {
              this.loaderService.isLoading.next(false);
              // console.log("update ", data);
              if (data["email_id"]) {
                // this.addMessageError = true;
                Swal.fire('Email id already taken!','', 'error');
              } else {
                if(data['resume']){
                  // this.resumeMessageError = true;
                  Swal.fire('The resume must be a file of type: docx, docs, pdf!','', 'error');
                } else {
                  // this.updateMessageSucess = true;
                  Swal.fire(' Candidate details have been updated successfully!','', 'success');
                }
              }
            },
            error => {
              // console.log("error", error);
              this.loaderService.isLoading.next(false);
            }
          );
      } else {
        // console.log("test", this.joineeDetails["value"]);

        let formdata = new FormData();
        formdata.append("created_by", this.userId);
        for (const key in this.joineeDetails["value"]) {
          if (key == "cold_call_status") {
            this.joineeDetails["value"][key].forEach((elem: { [x: string]: string | Blob; }, index: string) => {
              formdata.append(
                "cold_call_status[" + index + "][status_date]",
                elem["status_date"]
              );
              formdata.append(
                "cold_call_status[" + index + "][status]",
                elem["status"]
              );
            });
          } else if (key == "resume") {
            for (var i = 0; i < this.resumeFile.length; i++) {
            // console.log('hii', this.resumeFile);
              formdata.append("resume", this.resumeFile[i]);
            }
          } else {
            formdata.append(key, this.joineeDetails["value"][key]);
          }
        }
        // console.log("formdata", formdata);
        this.loaderService.isLoading.next(true);
        this.service
          .addJoinee(token, formdata)
          .pipe(first())
          .subscribe(
            data => {
              this.loaderService.isLoading.next(false);
              // console.log(data);
              if (data["email_id"]) {
                // this.addMessageError = true;
                 Swal.fire('Email id already taken!','', 'error');
              } else {
                if(data['resume']){
                  // this.resumeMessageError = true;
                  Swal.fire('The resume must be a file of type: docx, docs, pdf!','', 'error');
                } else {
                  // this.addMessageSucess = true;
                  Swal.fire('Candidate details has been added successfully!','', 'success');
                  this.joineeDetails.reset();
                }
              }
            },
            error => {
              // console.log("error", error);
              this.loaderService.isLoading.next(false);
            }
          );
      }
    }
  }

  /** Select the file details and store it in array for joinee document upload */
  onFileSelected(fileInput: any,key: string) {
    if (this.myFiles.find((x: { fileName: any; }) => x.fileName == key)) {
      let index = this.myFiles.findIndex((x: { fileName: any; }) => x.fileName == key);
      this.myFiles.splice(index, 1);
      for (var i = 0; i < fileInput.length; i++) {
        if(key == "contract"){
          fileInput[i].fileName = "contract";
        }
        if(key == "joiningCommitement"){
          fileInput[i].fileName = "joiningCommitement";
        }
        if(key == "salaryBreakUp"){
          fileInput[i].fileName = "salaryBreakUp";
        }
        this.myFiles.splice(index, 0, fileInput[i]);
      }
    } else {
      for (var i = 0; i < fileInput.length; i++) {
        if(key == "contract"){
         fileInput[i].fileName = "contract";
        this.myFiles.push( fileInput[i]);
        }
        if(key == "joiningCommitement"){
          fileInput[i].fileName = "joiningCommitement";
          this.myFiles.push( fileInput[i]);
        }
        if(key == "salaryBreakUp"){
          fileInput[i].fileName = "salaryBreakUp";
        this.myFiles.push( fileInput[i]);
        }
      }
    }
    // console.log("myFiles", this.myFiles);
  }

  
  
  updateDocumentDetails(){
    // console.log("joineeDocuments", this.joineeDocuments["value"]);
    this.updateDocumentMessageSucess = false;
    this.updateDocumentMessageFailure = false;

    let joineeDocument = this.joineeDocuments["value"];
    // console.log("joineeDocument", joineeDocument);
    const formData = new FormData();
    formData.append("joinee_id", this.joinee_id);
    formData.append("updated_by", this.userId);
    for (const key in this.joineeDocuments["value"]) {
      if (key == "ContractFile") {
        let contract = this.myFiles.filter((x: { fileName: string; }) => x.fileName == "contract" );
        if(contract != ""){
        for (var i = 0; i < contract.length; i++) {
          formData.append("ContractFile", contract[i]);
        }
      }
      else{
        formData.append("ContractFile", null);
      }
      } 
      else if(key == "joiningCommitementFile") {
        let joining_commitement = this.myFiles.filter((x: { fileName: string; }) => x.fileName == "joiningCommitement" );
        if(joining_commitement != ""){
        for (var i = 0; i < joining_commitement.length; i++) {
          formData.append("joiningCommitementFile", joining_commitement[i]);
        }
      }
      else{
        formData.append("joiningCommitementFile", null);
      }
      } 
      else if(key == "salaryBreakUpFile") {
        let salary_break_up = this.myFiles.filter((x: { fileName: string; }) => x.fileName == "salaryBreakUp" );
        if(salary_break_up != ""){
        for (var i = 0; i < salary_break_up.length; i++) {
          formData.append("salaryBreakUpFile", salary_break_up[i]);
        }
      }
      else{
        formData.append("salaryBreakUpFile", null);
      }
      } 
      else {
        formData.append(key, this.joineeDocuments["value"][key]);
      }
    }

    this.loaderService.isLoading.next(true);
    this.service
      .updateDocument(
        this.token,
        formData,
        this.joineeDocuments["value"]['id']
      )
      .pipe(first())
      .subscribe(data => {
        this.loaderService.isLoading.next(false);
        if (data["ContractFile"] || data["joiningCommitementFile"] || data["salaryBreakUpFile"]) {
          // this.updateDocumentMessageFailure = true;
          Swal.fire('Only pdf,docx and doc files are allowed!', '', 'error')
          // console.log("data123", data);
        } else {
          this.get_document = data.data;
          // console.log('get_doc', this.get_document);
          this.doc_files = data.data["file_details"]; 
          // this.updateDocumentMessageSucess = true;
          Swal.fire('Candidate document have been updated successfully!', '', 'success')
        }
        (error: any) => {
          // console.log("error", error);
          this.loaderService.isLoading.next(false);
        };
      },
      error => {
        this.loaderService.isLoading.next(false);
        // console.log("error", error);
      });
  }


  /** upload joinee document on submit */
  // documentSubmit() {
  //   console.log("joineeDocuments", this.joineeDocuments["value"]);
  // }

    documentSubmit() {
      this.updateDocumentMessageSucess = false;
      this.updateDocumentMessageFailure = false;
      // console.log("joineeDocuments", this.joineeDocuments["value"]);

    let joineeDocument = this.joineeDocuments["value"];
    // console.log("joineeDocument", joineeDocument);
    const formData = new FormData();
    formData.append("joinee_id", this.joinee_id);
    formData.append("created_by", this.userId);
    for (const key in this.joineeDocuments["value"]) {
      if (key == "ContractFile") {
        let contract = this.myFiles.filter((x: { fileName: string; }) => x.fileName == "contract" );
        if(contract != ""){
        for (var i = 0; i < contract.length; i++) {
          formData.append("ContractFile", contract[i]);
        }
      }
      else{
        formData.append("ContractFile", null);
      }
      } 
      else if(key == "joiningCommitementFile") {
        let joining_commitement = this.myFiles.filter((x: { fileName: string; }) => x.fileName == "joiningCommitement" );
        if(joining_commitement != ""){
        for (var i = 0; i < joining_commitement.length; i++) {
          formData.append("joiningCommitementFile", joining_commitement[i]);
        }
      }
      else{
        formData.append("joiningCommitementFile", null);
      }
      } 
      else if(key == "salaryBreakUpFile") {
        let salary_break_up = this.myFiles.filter((x: { fileName: string; }) => x.fileName == "salaryBreakUp" );
        if(salary_break_up != ""){
        for (var i = 0; i < salary_break_up.length; i++) {
          formData.append("salaryBreakUpFile", salary_break_up[i]);
        }
      }
      else{
        formData.append("salaryBreakUpFile", null);
      }
      } 
      else {
        formData.append(key, this.joineeDocuments["value"][key]);
      }
    }
    this.loaderService.isLoading.next(true);
    this.service
      .addDocument(
        this.token,
        formData,
        this.joinee_id
      )
      .pipe(first())
      .subscribe(data => {
        this.loaderService.isLoading.next(false);
        if (data["ContractFile"] || data["joiningCommitementFile"] || data["salaryBreakUpFile"]) {
          // this.updateDocumentMessageFailure = true;
           Swal.fire('  Only pdf,docx and doc files are allowed!','', 'error');
          // console.log("data123", data);
        } else {
          this.get_document = data.data;
          // console.log('get_doc', this.get_document);
          
          this.doc_files = data.data["file_details"]; 
          this.hide_send_mail = true;
          // this.updateDocumentMessageSucess = true;
          Swal.fire('  Candidate document have been updated successfully!','', 'success');
        }
        (error: any) => {
          // console.log("error", error);
          this.loaderService.isLoading.next(false);
        };
      },
      error => {
        this.loaderService.isLoading.next(false);
        // console.log("error", error);
      });
  }

  /** close the module and return to home module */
  OnCloseJoinee() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to exit?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(["pre-on-boarding"]);
      }
    })
  }

  /** Deleting the Particuler joinee document */
    deleteParticularDoc( document_id: string ) {
    this.deleteParticularDocumentMessage = false;
    let candidateId = this.joinee_id;
    const formData = new FormData();
    formData.append("candidate_id", this.joinee_id);
    if (document_id != "") {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete the particular document?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this.loaderService.isLoading.next(true);
          this.service
          .deleteParticularJoineeDoc(this.token, document_id, formData)
          .pipe(first())
          .subscribe(data => {
            this.loaderService.isLoading.next(false);
            // console.log("deleteDocument", data);
            
            if(data.data == "Document File has been deleted successfully"){
                // this.deleteParticularDocumentMessage = true;
                Swal.fire('Joinee Document File has been deleted!', '', 'success')
            }
            /** get the joinee document details */
              this.service.getDocument(this.token, this.joinee_id).subscribe(
                data => {
                    this.doc_files = data.data["file_details"]; 
                    // console.log('delete-particular-received-files', this.doc_files);
                },
                error => {
                  // console.log("doc-error", error);
                }
        );
            (error: any) => {
              // console.log("deleteDocument_error", error);
              this.loaderService.isLoading.next(false);
            };
          });
        }
      })
    }
  }

  /** Deleting All the joinee document */
    deleteAllDoc( document_id: string ) {
      this.deleteAllDocumentMessage = false;
      let candidateId = this.joinee_id;
      const formData = new FormData();
      formData.append("document_id", document_id);
      if (document_id != "" && candidateId != "") {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to delete?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
            this.loaderService.isLoading.next(true);
            this.service
            .deleteAllJoineeDoc(this.token, candidateId, formData)
            .pipe(first())
            .subscribe(data => {
              this.loaderService.isLoading.next(false);
              // console.log("deleteAllDocument", data);
              if(data.data == "Documents have been deleted successfully"){
                // this.deleteAllDocumentMessage = true;
                Swal.fire('Joinee Document Details has been deleted!', '', 'success')
              }
              /** get the joinee document details */
              this.service.getDocument(this.token, this.joinee_id).subscribe(
                data => {
                  if(data.data == ""){
                    this.doc_files = "";
                  }
                    this.doc_files = data.data["file_details"]; 
                    if(this.doc_files != undefined){
                      this.hide_send_mail = true;
                    } else {
                      this.hide_send_mail = false;
                    }
                },
                error => {
                  // console.log("doc-error", error);
                }
              );
              (error: any) => {
                // console.log("deleteAllDocument_error", error);
                this.loaderService.isLoading.next(false);
              };
            });
          }
        })
      }
    }

  /** Deleting the joinee tech document */
  OnDeleteTrainingTask(candidate_id: string, task_id: string | Blob) {
    this.deleteTechDetailMessage = false;
    const formData = new FormData();
    formData.append("techinical_task_id", task_id);
    if (task_id != "" && candidate_id != "") {
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
          this.loaderService.isLoading.next(true);
          this.service
          .deleteTechDetails(this.token, candidate_id, formData)
          .pipe(first())
          .subscribe(data => {
            this.loaderService.isLoading.next(false);
            // console.log("deleteDocument", data);
            this.consultantTask = data.data.consultant_tech_details;
            this.trainingTask = data.data.training_tech_details;
            // console.log('consultant-tasks',this.consultantTask);
            // console.log('training-tasks',this.trainingTask);
            // this.deleteTechDetailMessage = true;
            Swal.fire('Techinical Detail has been deleted!', '', 'success');
            (error: any) => {
              // console.log("deleteDocument_error", error);
              this.loaderService.isLoading.next(false);
            };
          });
        }
      })
    }
  }

  /** show/hide the lead drop down box on radio button select */
  consultant_lead_click(value: any) {
    if (value == "yes") {
      this.isShownConsultant = true;
    } else {
      this.isShownConsultant = false;
      this.joineeDetails.get("consultant_lead_id").reset();
    }
  }  
  
  /** show the document add module */
  openModal(data_id = "") {
    this.joineeDocuments.reset();
    this.doc_data_display  = {};
    this.joineeContractFile = null;
    this.joineeCommitmentFile = null;
    this.joineeSalaryFile = null;
    this.showModal = true;
    this.closeTimeOpen = true;
    if (data_id != "") {
      // console.log('data1234', data_id);
      // console.log('data1', this.joinee_id);

      // this.loaderService.isLoading.next(true);
      this.service.getParticularJoineehDocument(this.token, data_id).subscribe(
        data => {
          this.loaderService.isLoading.next(false);
          // console.log("get-doc-data", data);
          // this.userName
          this.hide_send_mail = true;
          this.doc_data_display = data.data['0']; 
          if(this.doc_data_display["created_name"] != null){
            this.userName = this.doc_data_display["created_name"];
          }
          if(this.doc_data_display["updated_name"] != null){
            this.userName = this.doc_data_display["updated_name"];
          }
          if (this.doc_data_display["contract"] == 1) {
              this.joineeContractFile = 1;
          }
          if (this.doc_data_display["joining_commitement"] == 1) {
            this.joineeCommitmentFile = 2;
          }
          if (this.doc_data_display["salary_break_up"] == 1) {
            this.joineeSalaryFile = 3;
          }
          this.contract_comment_value = this.doc_data_display.contract_comment == "null" ? '': this.doc_data_display.contract_comment;
          this.joining_commitement_comment_value = this.doc_data_display.joining_commitement_comment == "null" ? '': this.doc_data_display.joining_commitement_comment;
          this.salary_break_up_comment_value = this.doc_data_display.salary_break_up_comment == "null" ? '': this.doc_data_display.salary_break_up_comment;
          this.joining_bonus_comment_value = this.doc_data_display.joining_bonus_comment == "null" ? '': this.doc_data_display.joining_bonus_comment;
          this.back_up_lead_comment_value = this.doc_data_display.back_up_lead_comment == "null" ? '': this.doc_data_display.back_up_lead_comment;
          this.contract_value = this.doc_data_display["contract"].toString();
          this.joining_commitement_value = this.doc_data_display["joining_commitement"].toString();
          this.salary_break_up_value = this.doc_data_display["salary_break_up"].toString();
          this.joining_bonus_value = this.doc_data_display["joining_bonus"].toString();
          this.back_up_lead_value = this.doc_data_display["back_up_lead"].toString();
        },
        error => {
          this.loaderService.isLoading.next(false);
          // console.log("doc-error", error);
        }
      );
    }
  }

  /** hide the document add module */
  hide() {
    this.showModal = false;
    this.updateDocumentMessageSucess = false;
    this.updateDocumentMessageFailure = false;
    
    this.joineeContractFile1 = true;
    this.joineeCommitmentFile1 = true;
    this.joineeSalaryFile1 = true;
    this.myFiles = [];
  }

  open(key: number){
    // console.log('key', key);
    if(key == 1){
       this.joineeContractFile = key;
    }
    if(key == 2){
      this.joineeCommitmentFile = key;
    }
    if(key == 3){
      this.joineeSalaryFile = key;
    }
  }

  close(key: number, fileName: any){
    // console.log('key', key);
    if(key == 4){
      this.joineeContractFile = key;
   }
   if(key == 5){
     this.joineeCommitmentFile = key;
   }
   if(key == 6){
     this.joineeSalaryFile = key;
   }
   if (this.myFiles.find((x: { fileName: any; }) => x.fileName == fileName)) {
    //  console.log('test');
      let index = this.myFiles.findIndex((x: { fileName: any; }) => x.fileName == fileName);
      this.myFiles.splice(index, 1);
    } 
  }

  downloadDoc(id){
    // console.log('check_id', id);
    this.service.downloadParticularDoc(this.token, id);
  }

  downloadCandidateDocs(id){
    // console.log(this.token);
    // console.log('Doc', id);
    
    this.service.downloadCandidateDoc(this.token, id);
  }

  downloadResume(id){
    // console.log('resume_id', id);
    this.service.downloadResume(this.token, id);
  }
  
   /** show the consultant task module */
  openConsultantTask(key: any){
    this.consultantleadTask = true;
    this.trainingleadTask = false;
    this.consultantButtonClicked = true;
    this.trainingButtonClicked = false;
    this.consultantleadTaskForm = false;
    this.trainingleadTaskForm = false;


    /* get the tech doc **/
    this.service.getTechDocument(this.token, this.joinee_id).subscribe(
      data => {
        // console.log("data-tech ", data.data);
        this.consultantTask = data.data.consultant_tech_details;
      },
      error => {
        // console.log("error", error);
      }
    );

  }

   /** show the Training task module */
  openTrainingTask(key: any){
    this.trainingleadTask = true;
    this.consultantleadTask = false;
    this.trainingButtonClicked = true;
    this.consultantButtonClicked = false;
    this.consultantleadTaskForm = false;
    this.trainingleadTaskForm = false;

    /* get the tech doc **/
    this.service.getTechDocument(this.token, this.joinee_id).subscribe(
      data => {
        // console.log("data-tech ", data.data);
        this.trainingTask = data.data.training_tech_details;
      },
      error => {
        // console.log("error", error);
      }
    );
  }

  taskAssigned(key: any){
    switch (key) {
      case 0:
        this.consultantleadTaskAssign = false;
          break;
      case 1:
        this.consultantleadTaskAssign = true;
          break;
      case 2:
        this.trainingleadTaskAssign = true;
          break;
      case 3:
        this.trainingleadTaskAssign = false;
          break;
      default:
        this.consultantleadTaskAssign = false;
        this.trainingleadTaskAssign = false;
          break;
  }
  }
  ref:ComponentRef<any>;  

techinicalTask(key: string){
      // console.log(key);
      this.consultantleadTaskForm = false;
      this.trainingleadTaskForm = false;
      if(key == "consultant")
      {
      this.consultantDetails = null;
      this.consultantleadTaskForm = true;
      this.consultantleadTask = false;
      }
      if(key == "training")
      {
      this.trainingDetails = null;
      this.trainingleadTaskForm = true;
      this.trainingleadTask = false;
      }
  }

  /** navigate to edit page for consultant task details */
  consultantTaskEdit(data){
    // console.log('data',data);
    this.consultantDetails = data;
    this.consultantleadTaskForm = true;
    this.consultantleadTask = false;
  }

   /** navigate to edit page for training task details */
   trainingTaskEdit(data){
    // console.log('data',data);
    this.trainingDetails = data;
    this.trainingleadTaskForm = true;
    this.trainingleadTask = false;
  }

  Onboarding(){
    // console.log('data', this.joinee_id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to move the employee from onboarding?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
         this.loaderService.isLoading.next(true);
        this.service.updatecanditateOnboarding(this.joinee_id, this.token)
        .subscribe(
          data => {
            this.loaderService.isLoading.next(false);
            this.router.navigate(["pre-on-boarding"]);            
          },    
          error => {
            // console.log('error', error);
          } 
        );
      }
    })
  }

  // getting the failed mail lists
  onGetFailedMails(){
    this.service
    .getFailedMails(this.token, this.id)
    .pipe(first())
    .subscribe(
      data => {
        this.failedMails = data.data;
      },
      error => {
        // console.log("error", error);
      }
    );

  }

  //Re send the failed mails
  onSendFailedMails(){
    this.loaderService.isLoading.next(true);
    this.service.sendFailedMails(this.token).subscribe(
      (resData) => {
        this.loaderService.isLoading.next(false);
        this.onGetFailedMails();
      },
      (errorData) => {
        this.loaderService.isLoading.next(false);
      }
    );
  }

  

}

