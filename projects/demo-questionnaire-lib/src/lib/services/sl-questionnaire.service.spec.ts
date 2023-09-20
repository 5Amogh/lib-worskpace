import { TestBed } from '@angular/core/testing';

import { SlQuestionnaireService } from './sl-questionnaire.service';

describe('SlQuestionnaireService', () => {
  let service: SlQuestionnaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlQuestionnaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
