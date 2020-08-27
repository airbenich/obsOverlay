import { TestBed } from '@angular/core/testing';

import { OverlaysapiService } from './overlaysapi.service';

describe('OverlaysapiService', () => {
  let service: OverlaysapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlaysapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
