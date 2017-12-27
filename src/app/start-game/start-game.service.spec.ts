import { TestBed, inject } from '@angular/core/testing';

import { StartGameService } from './start-game.service';

describe('StartGameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StartGameService]
    });
  });

  it('should be created', inject([StartGameService], (service: StartGameService) => {
    expect(service).toBeTruthy();
  }));
});
