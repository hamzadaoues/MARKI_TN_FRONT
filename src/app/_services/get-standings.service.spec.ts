import { TestBed } from '@angular/core/testing';

import { GetStandingsService } from './get-standings.service';

describe('GetStandingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetStandingsService = TestBed.get(GetStandingsService);
    expect(service).toBeTruthy();
  });
});
