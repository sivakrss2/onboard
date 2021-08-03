import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
@Component({
  selector: 'app-id-card',
  templateUrl: './id-card.component.html',
  styleUrls: ['./id-card.component.css']
})
export class IdCardComponent implements OnInit {
  IdCard: FormGroup;
  bloodGroupList = [
      {id:'A+', name:'A+'},
      {id:'A-', name:'A-'},
      {id:'B+', name:'B+'},
      {id:'B-', name:'B-'},
      {id:'AB+', name:'AB+'},
      {id:'AB-', name:'AB-'},
      {id:'AB-', name:'AB-'},
      {id:'AB-', name:'AB-'},
      {id:'O+', name:'O+'},
      {id:'O-', name:'O-'},
    ];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.IdCard = this.fb.group({
      name:[null, Validators.required],
      address:[null, Validators.required],
      image:[null, Validators.required],
      bloodGroup:[null, Validators.required],
    });
  }

}
