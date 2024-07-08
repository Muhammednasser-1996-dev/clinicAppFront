import { TestBed } from '@angular/core/testing';

import { MetadataServiceService } from './metadata-service.service';

describe('MetadataServiceService', () => {
  let service: MetadataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetadataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
