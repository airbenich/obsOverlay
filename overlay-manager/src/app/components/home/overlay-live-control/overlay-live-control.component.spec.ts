import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayLiveControlComponent } from './overlay-live-control.component';

describe('OverlayLiveControlComponent', () => {
  let component: OverlayLiveControlComponent;
  let fixture: ComponentFixture<OverlayLiveControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayLiveControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayLiveControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
