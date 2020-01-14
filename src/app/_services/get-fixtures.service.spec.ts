import { TestBed } from '@angular/core/testing';

import { GetFixturesService } from './get-fixtures.service';

describe('GetFixturesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetFixturesService = TestBed.get(GetFixturesService);
    expect(service).toBeTruthy();
  });
});
