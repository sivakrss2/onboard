import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechinicalTaskComponent } from './techinical-task.component';

describe('TechinicalTaskComponent', () => {
  let component: TechinicalTaskComponent;
  let fixture: ComponentFixture<TechinicalTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechinicalTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechinicalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
