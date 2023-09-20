import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatrixQuestionsComponent } from './matrix-questions.component';

describe('MatrixQuestionsComponent', () => {
  let component: MatrixQuestionsComponent;
  let fixture: ComponentFixture<MatrixQuestionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
