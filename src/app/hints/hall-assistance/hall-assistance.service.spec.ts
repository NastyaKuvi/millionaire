import { TestBed, inject } from '@angular/core/testing';

import { HallAssistanceService } from './hall-assistance.service';

describe('HallAssistanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HallAssistanceService]
    });
  });

  it('should be created', inject([HallAssistanceService], (service: HallAssistanceService) => {
    expect(service).toBeTruthy();
  }));
});
