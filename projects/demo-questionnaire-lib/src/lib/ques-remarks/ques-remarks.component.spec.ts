import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuesRemarksComponent } from './ques-remarks.component';

describe('QuesRemarksComponent', () => {
  let component: QuesRemarksComponent;
  let fixture: ComponentFixture<QuesRemarksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuesRemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
