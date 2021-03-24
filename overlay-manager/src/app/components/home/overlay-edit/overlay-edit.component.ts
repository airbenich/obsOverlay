import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOverlay } from 'src/app/models/ioverlay';

@Component({
  selector: 'app-overlay-edit',
  templateUrl: './overlay-edit.component.html',
  styleUrls: ['./overlay-edit.component.scss']
})
export class OverlayEditComponent implements OnInit {
  @Input() selectedOverlay: IOverlay;
  @Output() closedOverlay: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public closeOverlay(): void {
    this.closedOverlay.emit();
    delete this.selectedOverlay;
  }

}
