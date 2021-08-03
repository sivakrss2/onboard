import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDepartmentDesignationComponent } from './new-department-designation.component';

describe('NewDepartmentDesignationComponent', () => {
  let component: NewDepartmentDesignationComponent;
  let fixture: ComponentFixture<NewDepartmentDesignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDepartmentDesignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDepartmentDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
