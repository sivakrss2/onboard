import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoineeComponent } from './joinee.component';

describe('JoineeComponent', () => {
  let component: JoineeComponent;
  let fixture: ComponentFixture<JoineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
