import { TestBed } from '@angular/core/testing';

import { CardapiService } from './cardapi.service';

describe('CardapiService', () => {
  let service: CardapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
