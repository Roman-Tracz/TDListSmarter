import { TestBed } from '@angular/core/testing';

import { BucketJsonService } from './bucket-json.service';

describe('BucketJsonService', () => {
  let service: BucketJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BucketJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
