import { TestBed } from '@angular/core/testing';

import { CurrentMatchService } from './current-match.service';

describe('CurrentMatchService', () => {
  let service: CurrentMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
