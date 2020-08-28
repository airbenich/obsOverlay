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
  selectedOverlay = 0;
  constructor(private overlaysApiService: OverlaysApiService) { }

  onClick(selectedoverlay: Overlay): void {
    this.overlays.forEach((overlay, index) => {
      if (overlay.id == selectedoverlay.id) {
        overlay.status = "active";
      }
      else {
        overlay.status = "inactive";
      }
      this.selectedOverlay = overlay.id;
      this.overlaysApiService.updateOverlay(overlay).subscribe();
    })
  }

  ngOnInit() {
    this.getOverlays();
  }

  getOverlays(): void {
    this.overlaysApiService.getOverlays().subscribe(overlays => this.overlays = overlays);
  }

  delete(overlay: Overlay): void {
    this.overlays = this.overlays.filter(o => o !== overlay);
    this.overlaysApiService.deleteOverlay(overlay).subscribe();
  }
}
