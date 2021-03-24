import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOverlay } from '../../../models/ioverlay';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-overlay-list',
  templateUrl: './overlay-list.component.html',
  styleUrls: ['./overlay-list.component.scss']
})
export class OverlayListComponent implements OnInit {
  overlays: IOverlay[];
  @Input() selectedOverlay: IOverlay;

  @Output() selectOverlay = new EventEmitter<IOverlay>();

  constructor(private overlayServerService: OverlayServerService) {
    this.overlayServerService.getLowerThirds().then(overlay => {
      this.overlays = overlay;
    });
    // this.overlays = [];
    // this.overlays.push({
    //   title: 'Max Mustermann',
    //   subtitle: 'Mustertechniker'
    // } as IOverlay);
    // this.overlays.push({
    //   title: 'Freiherr von Bauch',
    //   subtitle: 'Bauchbinder'
    // } as IOverlay);
    // this.overlays.push({
    //   title: 'Peter Pan',
    //   subtitle: 'Pantologe'
    // } as IOverlay);
   }

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
