import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayListComponent } from './overlay-list.component';

describe('OverlayComponent', () => {
  let component: OverlayListComponent;
  let fixture: ComponentFixture<OverlayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
