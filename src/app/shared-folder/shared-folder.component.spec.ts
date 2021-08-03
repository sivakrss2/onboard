import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFolderComponent } from './shared-folder.component';

describe('SharedFolderComponent', () => {
  let component: SharedFolderComponent;
  let fixture: ComponentFixture<SharedFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
