

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { from } from 'rxjs';
import { FactSheetService } from 'src/app/services/factsheet.services';

@Component({
  selector: 'app-fact-sheet',
  templateUrl: './fact-sheet.component.html',
  styleUrls: ['./fact-sheet.component.css']
})
export class FactSheetComponent implements OnInit {

  public state;
  public town;
  public loginData = JSON.parse  (localStorage.getItem('login'));
  token = this.loginData['token'];
  isLinear = false;
  siblingDetail: FormGroup;
  secondFormGroup: FormGroup;
  factSheet: FormGroup;  
  educationalQualification: FormGroup;
  professionalCertifications: FormGroup;
  rateYourKnowledge: FormGroup;
  workExperience: FormGroup;
  Final: FormGroup;
  isLanguageDisabled = true;
  isShown: boolean = false ;
  isShownPass: boolean = false ;
  factSheetFormError = {
    'positionApplied': '',
    'name': '',
    'age': '',
    'dateOfBirth': '',    
    'state': '',   
    'town': '',   
    'fatherName': '',   
    'fatherOccupation': '',   
    'candidate_mobile': '',   
    'candidate_email': '',   
    'maritalStatus': '',
    'religion': '',
    'address': '',
  };
  educationalQualificationFormError = {
    'maths_10': '',
    'maths_12': '',
  };

  educationalQualificationValidationMessages = {
    'maths_10': {
      'required': '10th mark is required.',    
    },
    'maths_12': {
      'required': '12th mark is required.',    
    },
  };

  factSheetValidationMessages = {
    'positionApplied': {
      'required': 'Position Applied For is required.',
      'minlength': 'Full Name must be greater than 3 characters.',     
    },
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be greater than 3 characters.',   
    },
    'age': {
      'required': 'Age is required.',
    },
    'dateOfBirth': {
      'required': 'Date Of Birth is required.',
    },
    'state': {
      'required': 'State is required.',
    },
    'town': {
      'required': 'Town is required.',
    },
    'fatherName': {
      'required': 'Father\'s is required.',
    },
    'fatherOccupation': {
      'required': 'Father\'s is required.',
    },
    'candidate_mobile': {
      'required': 'Mobile number is required.',
    },
    'candidate_email': {
      'required': 'Candidate Email is required.',
      'email': 'Please enter a valid email.', 
      // 'minlength': 'Full Name must be greater than 3 characters.',    
    },
    'maritalStatus' : {
      'required': 'Marital status is required.',
    },
    'religion' : {
      'required': 'Religion is required.',
    },
    'address' : {
      'required': 'Address is required.',
    },
  };

  constructor(private fb: FormBuilder,
              private service: FactSheetService) {}

  ngOnInit() {
    this.service.getState(this.token)
    .subscribe(
     data => {
      this.state = data['data'];
      console.log('state', this.state);
     },
     error=>{
      console.log('error', error);
     });

    this.service.getTowns(this.token)
    .subscribe(
     data => {
      this.town = data['data'];
      console.log('town', this.town);
     },
     error=>{
      console.log('error', error);
     });

    document.body.className="joneescreen";
    this.factSheet = this.fb.group({      
        positionApplied: ['', [Validators.required,Validators.minLength(3)]],
        name: ['', [Validators.required, Validators.minLength(3)]],
        age: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        state: ['', Validators.required],
        town: ['', Validators.required],        
        fatherName: ['', Validators.required],        
        fatherOccupation: ['', Validators.required],        
        candidate_mobile: ['', Validators.required],        
        candidate_email: ['', [Validators.required, Validators.email]],        
        languageKnown: this.fb.array([
          this.addLanguageKnownFormGroup()
        ]),
        maritalStatus : ['', Validators.required],
        spouseName: [''],
        spouseOccupation : [''],
        religion : ['', Validators.required],
        address : ['', Validators.required],

    });   
    this.factSheet.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.factSheet,  this.factSheetFormError, this.factSheetValidationMessages);
    });
    
    this.siblingDetail = this.fb.group({
      siblings: this.fb.array([
        this.addSiblingFormGroup()
      ])
    });

    this.educationalQualification = this.fb.group({
      educationalDetails:this.fb.array([
        this.addEducationalDetailFormGroup()
      ]),
      maths_10:['', Validators.required],
      maths_12:['', Validators.required],
    });

    this.educationalQualification.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.educationalQualification,  this.educationalQualificationFormError, this.educationalQualificationValidationMessages);
    });

    this.professionalCertifications = this.fb.group({
      certificationDetails:this.fb.array([
        this.addProfessionalCertificationsFormGroup()
      ]),
    });

    this.rateYourKnowledge = this.fb.group({
      knowledgeDetails:this.fb.array([
        this.addRateYourKnowledge()
      ])
    });

    this.workExperience = this.fb.group({
      experienceDetails: this.fb.array([
        this.addWorkExperienceFormGroup()
      ])
    })
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });

    this.Final = this.fb.group({      
      salary: [null],
      deductions: [null],
      monthly_ctc: [null],
      yearly_ctc: [null],
      others: [null],
      responsibilities: [null],
      achievements: [null],
      ambition: [null],
      passport: [null],
  });   
  }

  ngOnDestroy() : void {
    document.body.className="";
  }
 
/** Form Validation function */
  logValidationErrors(group: FormGroup, formError:any, validationMessages:any ): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl,formError,validationMessages);
      } else {
        formError[key] = '';
        if (abstractControl && !abstractControl.valid
            && (abstractControl.touched || abstractControl.dirty)) {
          const messages = validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              formError[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

/**Add language Known */
addLanguageKnownFormGroup(): FormGroup {
  return this.fb.group({
    languageName: ['', Validators.required]   
  });
}
addSiblingFormGroup(): FormGroup {
  return this.fb.group({
    siblingName: ['', Validators.required], 
    courseDesignation: ['', Validators.required], 
    instituteName: ['', Validators.required], 
  });
}
addEducationalDetailFormGroup(): FormGroup {
  return this.fb.group({    
    yearFrom:['', Validators.required],
    yearTo:['', Validators.required],
    examinationPassed:['', Validators.required],
    course:['', Validators.required],
    schoolCollege:['', Validators.required],
    mediumOfInstruction:['', Validators.required],
    markPercentage:['', Validators.required],
    arrears:['', Validators.required],
    classObtained:['', Validators.required]    
  })
}
  addProfessionalCertificationsFormGroup(): FormGroup{
    return this.fb.group({ 
      certificationName : [null],
      yearOfCompletion : [null],
    })
  }

  addRateYourKnowledge(): FormGroup{
    return this.fb.group({
      subject:[null],
      rating:[null],
    })
  }

  addWorkExperienceFormGroup():FormGroup{
    return this.fb.group({
      fromDate:[],
      toDate:[],
      totalExperience:[],
      designation:[],
      organization:[],
      place:[],
      leavingReason:[]
    })
  }

  onAddLanguageKnown(): void {
    (<FormArray>this.factSheet.get('languageKnown')).push(this.addLanguageKnownFormGroup());
    this.isLanguageDisabled = false;
  }
  onAddSibling(): void{
    (<FormArray>this.siblingDetail.get('siblings')).push(this.addSiblingFormGroup());
  }

  onAddEducationalDetails(): void{
    (<FormArray>this.educationalQualification.get('educationalDetails')).push(this.addEducationalDetailFormGroup());
  }
  onAddaddProfessionalCertifications(): void{
    (<FormArray>this.professionalCertifications.get('certificationDetails')).push(this.addProfessionalCertificationsFormGroup())
  }

  onAddWorkExperience(): void {
    (<FormArray>this.workExperience.get('experienceDetails')).push(this.addWorkExperienceFormGroup());    
  }

  onRemoveLanguage(index: number){    
    (<FormArray>this.factSheet.get('languageKnown')).removeAt(index);
  }

  onAddRateYourKnowledge(): void{
    (<FormArray>this.rateYourKnowledge.get('knowledgeDetails')).push(this.addRateYourKnowledge());
  }
  onRemoveSibling(index: number){
    (<FormArray>this.siblingDetail.get('siblings')).removeAt(index);
  }

  onRemoveEducationalDetails(index: number){
    (<FormArray>this.educationalQualification.get('educationalDetails')).removeAt(index);

  }
  onRemoveCertificationDetails (index: number){
    (<FormArray>this.professionalCertifications.get('certificationDetails')).removeAt(index);
  }

  onRemoveRateYourKnowledge(index: number){
    (<FormArray>this.rateYourKnowledge.get('knowledgeDetails')).removeAt(index);
  }

  onRemoveWorkExperience(index: number){
    (<FormArray>this.workExperience.get('experienceDetails')).removeAt(index);   
  }



  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };     
    container.setViewMode('month');
  }
  
  get languageKnown(){
    return this.factSheet.get('languageKnown');
  }
  get siblings(){
    return this.siblingDetail.get('siblings');
  }
  get educationalDetails(){
    return this.educationalQualification.get('educationalDetails');
  }

  get certificationDetails(){
    return this.professionalCertifications.get('certificationDetails');
  }
  get knowledgeDetails(){
    return this.rateYourKnowledge.get('knowledgeDetails');
  }
  get experienceDetails(){
    return this.workExperience.get('experienceDetails');
  } 
  
  onSubmit()
  {
    console.log('factSheet', this.factSheet.value);
    console.log('siblingDetail', this.siblingDetail.value);
    console.log('educationalQualification', this.educationalQualification.value);
    console.log('professionalCertifications', this.professionalCertifications.value);
    console.log('rateYourKnowledge', this.rateYourKnowledge.value);
    console.log('workExperience', this.workExperience.value);
    console.log('Final', this.Final.value);

    // let details;
    // this.service.factSheetAdd(details, this.token)
    //     .subscribe(
    //       data => {
    //         console.log('data', data);
    //       error => {
    //         console.log('error', error);
    //       }
    //       });
  }

  open()
  {
    this.isShown = true;
  }
  
  close()
  {
    this.isShown = false;
  }

  openpassport()
  {
    this.isShownPass = true;
  }
  
  closepassport()
  {
    this.isShownPass = false;
  }
}
