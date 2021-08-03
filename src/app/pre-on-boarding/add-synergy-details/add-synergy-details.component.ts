import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-synergy-details',
  templateUrl: './add-synergy-details.component.html',
  styleUrls: ['./add-synergy-details.component.css']
})
export class AddSynergyDetailsComponent implements OnInit {

  departments = [
    { id: 1, department: "Test" },
    { id: 2, department: "Development" }
  ];
  designations = [
    { id: 1, designation: "Junior software developer" },
    { id: 2, designation: "Software developer" },
    { id: 3, designation: "Associate group lead" }
  ];
  companyNames = [
    { id: 1, name: "CG-vak" },
    { id: 2, name: "G2 Solutions" }
  ];
  
  synergyDetails: FormGroup;
  isChecked : boolean;

  constructor(private fb : FormBuilder) { 
    this.isChecked = false;
   }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.synergyDetails = new FormGroup({
      companyName: new FormControl(null, [Validators.required]),
      departmentId: new FormControl(null, [Validators.required]),
      designationId: new FormControl(null, [Validators.required]),
      employeeNumber: new FormControl(null),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      displayName: new FormControl(null, [Validators.required]),
      currentAddress1: new FormControl(null),
      currentAddress2: new FormControl(null),
      currentAddress3: new FormControl(null),
      currentCity: new FormControl(null),
      currentState: new FormControl(null),
      currentCountry: new FormControl(null),
      currentPincode: new FormControl(null),
      currentPhoneno: new FormControl(null),
      mobileNumber: new FormControl(null),
      sameAsCurrentAddress: new FormControl(null),
      permanentAddress1: new FormControl(null),
      permanentAddress2: new FormControl(null),
      permanentAddress3: new FormControl(null),
      permanentCity: new FormControl(null),
      permanentState: new FormControl(null),
      permanentCountry: new FormControl(null),
      permanentPincode: new FormControl(null),
      permanentPhoneno: new FormControl(null),
      fatherName: new FormControl(null),
      dob: new FormControl(null),
      doj: new FormControl(null, Validators.required),
      emailId: new FormControl(null, [
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
      ]),
      emloyeeIm: new FormControl(null),
      loginUserName: new FormControl(null),
      loginPassword: new FormControl(null),
      bloodGroupId: new FormControl(null),
      panNumber: new FormControl(null),
      pfNumber: new FormControl(null),
      esiNumber: new FormControl(null),
      bankName: new FormControl(null),
      maritalStatus: new FormControl(null),
      bankAccountNo: new FormControl(null),
      primarySkill: new FormControl(null),
      personalMailId: new FormControl(null, [
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
      ]),
      previouEmployee: new FormControl(null),
      previouExperienceYear: new FormControl(null),
      previouExperienceMonths: new FormControl(null),
      reference1Remarks: new FormControl(null),
      reference2Remarks: new FormControl(null),
      documentExtension: new FormControl(null),
      photoExtension: new FormControl(null),
      dateOfLeaving: new FormControl(null),
      reasonForLeaving: new FormControl(null),
      swipCardNo: new FormControl(null),
      group: new FormControl(null),
      location: new FormControl(null),
      shiftTiming: new FormControl(null),
      pseduo: new FormControl(null),
      currentTechnology: new FormControl(null),
      isActive: new FormControl(null),
      nightShift: new FormControl(null),
    });
  }


   /** synergy Details validation */
  
   get synergyCompany() {
    return this.synergyDetails.get("companyName");
  }
  get synergyDepartment() {
    return this.synergyDetails.get("departmentId");
  }
  get synergyDesignation() {
    return this.synergyDetails.get("designationId");
  }
  get synergyEmployeeFirstName() {
    return this.synergyDetails.get("firstName");
  }
  get synergyEmployeeLastName() {
    return this.synergyDetails.get("lastName");
  }
  get synergydisplayName() {
    return this.synergyDetails.get("displayName");
  }
  get dateOfJoining() {
    return this.synergyDetails.get("doj");
  }  

  synergyDetailsSubmit(){
    console.log('submit', this.synergyDetails['value']);
  }

  checkValue(e) {
    if (e.target.checked) {
      const currentAddress1 = this.synergyDetails.controls["currentAddress1"].value;
      const currentAddress2 = this.synergyDetails.controls["currentAddress2"].value;
      const currentAddress3 = this.synergyDetails.controls["currentAddress3"].value;
      const currentCity = this.synergyDetails.controls["currentCity"].value;
      const currentState = this.synergyDetails.controls["currentState"].value;
      const currentCountry = this.synergyDetails.controls["currentCountry"].value;
      const currentPincode = this.synergyDetails.controls["currentPincode"].value;
      const currentPhoneno = this.synergyDetails.controls["currentPhoneno"].value;
      this.synergyDetails.controls["permanentAddress1"].setValue(currentAddress1);
      this.synergyDetails.controls["permanentAddress2"].setValue(currentAddress2);
      this.synergyDetails.controls["permanentAddress3"].setValue(currentAddress3);
      this.synergyDetails.controls["permanentCity"].setValue(currentCity);
      this.synergyDetails.controls["permanentState"].setValue(currentState);
      this.synergyDetails.controls["permanentCountry"].setValue(currentCountry);
      this.synergyDetails.controls["permanentPincode"].setValue(currentPincode);
      this.synergyDetails.controls["permanentPhoneno"].setValue(currentPhoneno);
    }
    else {
      this.synergyDetails.controls["permanentAddress1"].setValue('');
      this.synergyDetails.controls["permanentAddress2"].setValue('');
      this.synergyDetails.controls["permanentAddress3"].setValue('');
      this.synergyDetails.controls["permanentCity"].setValue('');
      this.synergyDetails.controls["permanentState"].setValue('');
      this.synergyDetails.controls["permanentCountry"].setValue('');
      this.synergyDetails.controls["permanentPincode"].setValue('');
      this.synergyDetails.controls["permanentPhoneno"].setValue('');
    }

  }
}
