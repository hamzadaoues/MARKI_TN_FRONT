import { TestBed } from '@angular/core/testing';

import { GetPastMatchesService } from './get-past-matches.service';

describe('GetPastMatchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetPastMatchesService = TestBed.get(GetPastMatchesService);
    expect(service).toBeTruthy();
  });
});
