import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoineeListComponent } from './joinee-list.component';

describe('JoineeListComponent', () => {
  let component: JoineeListComponent;
  let fixture: ComponentFixture<JoineeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoineeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoineeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
