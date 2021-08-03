import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'app-marketing-assessment',
  templateUrl: './marketing-assessment.component.html',
  styleUrls: ['./marketing-assessment.component.css']
})
export class MarketingAssessmentComponent implements OnInit {

  // constructor() { }

  // ngOnInit() {
  // }
  isLinear = false;
  personalDetail: FormGroup;
  factors: FormGroup;
  interview: FormGroup;
  mockCall: FormGroup;
  finalStatus: FormGroup;
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
      marketing: [null, Validators.required],
      mock_call: [null, Validators.required],
      company: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(225)]],
      experience: [null, [Validators.required, Validators.minLength(3)]],
      remarkOfTheCompany: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(225)]],
    });
    
    this.factors = this.fb.group({
      marks:[null, Validators.required],
      degree:[null, Validators.required],
      fluency:[null, Validators.required],
      expression:[null, Validators.required] ,     
      experience:[null, Validators.required] ,     
      appearence:[null, Validators.required] ,     
      logical:[null, Validators.required] ,     
      responsibilities:[null, Validators.required] ,     
      result:[null, Validators.required] ,     
    });

    this.interview = this.fb.group({
      interview_communication:[null, Validators.required],
      academics:[null, Validators.required],
      background:[null, Validators.required],
      attitude:[null, Validators.required],
      domain:[null, Validators.required],
      sales_exp:[null, Validators.required],
      other_exp:[null, Validators.required],
    });

    this.mockCall = this.fb.group({
      mock_call_communication:[null, Validators.required],
      voice:[null, Validators.required],
      explaining_ability:[null, Validators.required],
      sales_pitch:[null, Validators.required],
    });

    this.finalStatus = this.fb.group({
      final_status:[null, Validators.required],
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
  get marketingField(){
    return this.personalDetail.get('marketing');
  }
  get mockCallField(){
    return this.personalDetail.get('mock_call');
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
  get finalStatusField(){
    return this.finalStatus.get('final_status');
  }

}
