import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IOverlay } from 'src/app/models/ioverlay';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public overlayServerService: OverlayServerService) { }

  selectedOverlay: IOverlay;
  @Output() selectedOverlayChange: EventEmitter<IOverlay>;

  ngOnInit(): void {
  }

  public onClickShow10Button(): void {
    this.overlayServerService.showLowerThird(this.selectedOverlay);

    setTimeout(() => {
      this.overlayServerService.hideLowerThird(this.selectedOverlay);
    }, 10000);
  }

  public onClickShowButton(): void {
    this.overlayServerService.showLowerThird(this.selectedOverlay);
  }

  public onClickHideButton(): void {
    this.overlayServerService.hideLowerThird(this.selectedOverlay);
  }

  public overlaySelected(overlay: IOverlay): void {
    this.selectedOverlay = overlay;
  }

  public closeOverlay(): void {
    delete this.selectedOverlay;
  }

}
