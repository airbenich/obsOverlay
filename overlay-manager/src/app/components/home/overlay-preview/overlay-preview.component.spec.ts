import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayPreviewComponent } from './overlay-preview.component';

describe('OverlayPreviewComponent', () => {
  let component: OverlayPreviewComponent;
  let fixture: ComponentFixture<OverlayPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
