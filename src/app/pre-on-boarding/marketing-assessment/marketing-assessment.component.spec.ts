import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingAssessmentComponent } from './marketing-assessment.component';

describe('MarketingAssessmentComponent', () => {
  let component: MarketingAssessmentComponent;
  let fixture: ComponentFixture<MarketingAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
