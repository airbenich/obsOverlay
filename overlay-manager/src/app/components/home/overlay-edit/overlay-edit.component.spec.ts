import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayEditComponent } from './overlay-edit.component';

describe('OverlayEditComponent', () => {
  let component: OverlayEditComponent;
  let fixture: ComponentFixture<OverlayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
