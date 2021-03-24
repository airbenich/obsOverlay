import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTileComponent } from './button-tile.component';

describe('ButtonTileComponent', () => {
  let component: ButtonTileComponent;
  let fixture: ComponentFixture<ButtonTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
