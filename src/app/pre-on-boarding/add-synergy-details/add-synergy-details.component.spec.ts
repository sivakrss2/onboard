import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSynergyDetailsComponent } from './add-synergy-details.component';

describe('AddSynergyDetailsComponent', () => {
  let component: AddSynergyDetailsComponent;
  let fixture: ComponentFixture<AddSynergyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSynergyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSynergyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
