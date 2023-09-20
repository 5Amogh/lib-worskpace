import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckboxInputComponent } from './checkbox-input.component';

describe('CheckboxInputComponent', () => {
  let component: CheckboxInputComponent;
  let fixture: ComponentFixture<CheckboxInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
