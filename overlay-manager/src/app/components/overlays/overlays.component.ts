import { Component, OnInit } from '@angular/core';
import { Overlay } from '../overlays/overlay';
import { OverlaysApiService } from '../../services/overlaysapi.service';

@Component({
  selector: 'app-overlays',
  templateUrl: './overlays.component.html',
  styleUrls: ['./overlays.component.css']
})
export class OverlaysComponent implements OnInit {
  overlays: Overlay[];

  constructor( private overlaysApiService: OverlaysApiService) { }
  
  ngOnInit() {
    this.getOverlays();
  }

  getOverlays(): void {
    this.overlaysApiService.getOverlays()
    .subscribe(overlays => this.overlays = overlays);
  }

  delete(overlay: Overlay): void {
    this.overlays = this.overlays.filter(o => o !== overlay);
    this.overlaysApiService.deleteOverlay(overlay).subscribe();
  }
}
