import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';


@Component({
  selector: 'app-joinee',
  templateUrl: './joinee.component.html',
  styleUrls: ['./joinee.component.css']
})
export class JoineeComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    document.body.className="joneescreen";
  }

  ngOnDestroy() : void {
    document.body.className="";
  } 
  
}