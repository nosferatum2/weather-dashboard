import { TestBed } from '@angular/core/testing';

import { GeocodingAPIService } from './geocoding-api.service';

describe('GeocodingAPIService', () => {
  let service: GeocodingAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeocodingAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
