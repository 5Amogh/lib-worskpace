import { TestBed } from '@angular/core/testing';
import { SlTranslateService } from './translate.service';


describe('TranslateService', () => {
  let service: SlTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
