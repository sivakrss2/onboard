import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcommingJoineesComponent } from './upcomming-joinees.component';

describe('UpcommingJoineesComponent', () => {
  let component: UpcommingJoineesComponent;
  let fixture: ComponentFixture<UpcommingJoineesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcommingJoineesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcommingJoineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
