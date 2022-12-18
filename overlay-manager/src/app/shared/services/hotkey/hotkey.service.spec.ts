import { TestBed } from '@angular/core/testing';

import { HotkeyService } from './hotkey.service';

describe('HotkeyService', () => {
  let service: HotkeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotkeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
