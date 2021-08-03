import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  personalDetail: FormGroup;
  factors: FormGroup;
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
      company: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(225)]],
      experience: [null, [Validators.required, Validators.minLength(3)]],
      remarkOfTheCompany: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(225)]],
    });
    
    this.factors = this.fb.group({
      marks:[null, Validators.required],
      degree:[null, Validators.required],
      fluency:[null, Validators.required],
      expression:[null, Validators.required]      
    })

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
  get companyField(){
    return this.personalDetail.get('company');
  }
  get experienceField(){
    return this.personalDetail.get('experience');
  }
  get remarkOfTheCompanyField(){
    return this.personalDetail.get('remarkOfTheCompany');
  }

}
