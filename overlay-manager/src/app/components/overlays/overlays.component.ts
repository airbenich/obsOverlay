import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOverlay } from '../../models/ioverlay';

@Component({
  selector: 'app-overlays',
  templateUrl: './overlays.component.html',
  styleUrls: ['./overlays.component.css']
})
export class OverlaysComponent implements OnInit {
  overlays: IOverlay[];
  @Input() selectedOverlay: IOverlay;

  @Output() selectOverlay = new EventEmitter<IOverlay>();

  constructor() { }

  onClick(selectedoverlay: IOverlay): void {
    this.selectOverlay.emit(selectedoverlay);
  }

  ngOnInit(): void {
    this.getOverlays();
  }

  getOverlays(): void {
    // this.overlaysApiService.getOverlays().subscribe(overlays => this.overlays = overlays);
  }

  delete(overlay: IOverlay): void {
    this.overlays = this.overlays.filter(o => o !== overlay);
    // this.overlaysApiService.deleteOverlay(overlay).subscribe();
  }
}
