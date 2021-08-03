import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechinicalAssessmentComponent } from './techinical-assessment.component';

describe('TechinicalAssessmentComponent', () => {
  let component: TechinicalAssessmentComponent;
  let fixture: ComponentFixture<TechinicalAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechinicalAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechinicalAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
