import { TestBed } from '@angular/core/testing';

import { OverlayServerService } from './overlay-server.service';

describe('OverlayServerService', () => {
  let service: OverlayServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
