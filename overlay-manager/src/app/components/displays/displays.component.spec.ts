import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaysComponent } from './displays.component';

describe('DisplayComponent', () => {
  let component: DisplaysComponent;
  let fixture: ComponentFixture<DisplaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
