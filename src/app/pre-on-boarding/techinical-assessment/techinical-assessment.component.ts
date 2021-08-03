import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'app-techinical-assessment',
  templateUrl: './techinical-assessment.component.html',
  styleUrls: ['./techinical-assessment.component.css']
})
export class TechinicalAssessmentComponent implements OnInit {

  personalDetail: FormGroup;
  factors: FormGroup;
  interview: FormGroup;
  machine_test: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.personalDetail = this.fb.group({
      positionApplied: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(225)]],
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(225)]],
      qualification: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(225)]],
      date: [null, Validators.required],
      venue: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(225)]],
      callTime: [null, Validators.required],
      interview: [null, Validators.required],
      personal: [null, Validators.required],
      techinical: [null, Validators.required],
      machine_test: [null, Validators.required],
      company: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(225)]],
      experience: [null, [Validators.required, Validators.minLength(3)]],
      remarkOfTheCompany: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(225)]],
    });
    
    this.factors = this.fb.group({
      marks:[null, Validators.required],
      degree:[null, Validators.required],
      professional_certificate:[null, Validators.required],
      fluency:[null, Validators.required],
      expression:[null, Validators.required] ,     
      experience:[null, Validators.required] ,     
      appearence:[null, Validators.required] ,     
      logical:[null, Validators.required] ,     
      responsibilities:[null, Validators.required] ,     
      result:[null, Validators.required] ,     
    });

    this.interview = this.fb.group({
      techinical_exp:[null, Validators.required],
      techinical_communication:[null, Validators.required],
      Project_explination:[null, Validators.required],
      logical:[null, Validators.required],
      domain_knowledge:[null, Validators.required],
      technology_knowledge:[null, Validators.required],
      additiona_technology_knowledge:[null, Validators.required],
      database:[null, Validators.required],
      ui:[null, Validators.required],
      source_control:[null, Validators.required],
      result:[null, Validators.required],
    });

    this.machine_test = this.fb.group({
      understanding:[null, Validators.required],
      error_free:[null, Validators.required],
      code_comments:[null, Validators.required],
      ui:[null, Validators.required],
      code_quality:[null, Validators.required],
      logics:[null, Validators.required],
      data_acces:[null, Validators.required],
      result:[null, Validators.required],

    });

    this.personalDetail.valueChanges.subscribe((data) => {
      console.log(this.personalDetail);
    });
    
  }
  onSubmit(){
    console.log(this.personalDetail);
  }

  get positionAppliedField(){
    return this.personalDetail.get('positionApplied');
  }
  get nameField(){
    return this.personalDetail.get('name');
  }
  get qualificationField(){
    return this.personalDetail.get('qualification');
  }
  get dateField(){
    return this.personalDetail.get('date');
  }
  get venueField(){
    return this.personalDetail.get('venue');
  }
  get callTimeField(){
    return this.personalDetail.get('callTime');
  }
  get interviewField(){
    return this.personalDetail.get('interview');
  }
  get personalField(){
    return this.personalDetail.get('personal');
  }
  get techinicalField(){
    return this.personalDetail.get('techinical');
  }
  get machineTestField(){
    return this.personalDetail.get('machine_test');
  }
  get companyField(){
    return this.personalDetail.get('company');
  }
  get experienceField(){
    return this.personalDetail.get('experience');
  }
  get remarkOfTheCompanyField(){
    return this.personalDetail.get('remarkOfTheCompany');
  }
  // get finalStatusField(){
  //   return this.finalStatus.get('final_status');
  // }

}
