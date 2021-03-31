import { Component, Input, OnInit } from '@angular/core';
import { IOverlay } from 'src/app/models/ioverlay';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-overlay-live-control',
  templateUrl: './overlay-live-control.component.html',
  styleUrls: ['./overlay-live-control.component.css'],
})
export class OverlayLiveControlComponent implements OnInit {
  isCountdownStarted = false;
  isCountdownPaused = false;
  countdownTimer = 10;

  @Input() selectedOverlay: IOverlay;

  constructor(public overlayServerService: OverlayServerService) {}

  ngOnInit(): void {}

  public onClickShow10Button(): void {
    this.overlayServerService.showLowerThird(this.selectedOverlay);
    this.isCountdownStarted = true;
    this.countdown(this.countdownTimer);
  }

  public onClickPauseCountdownButton(): void {
    this.isCountdownPaused = true;
  }

  public onClickResumeCountdownButton(): void {
    this.isCountdownPaused = false;
  }

  private countdown(counter: any): void {
    this.countdownTimer = counter;
    if (counter <= 0 || !this.isCountdownStarted) {
      this.overlayServerService.hideLowerThird(this.selectedOverlay);
      this.countdownTimer = 10;
      this.isCountdownStarted = false;
    } else {
      if (!this.isCountdownPaused) {
        counter--;
      }
      setTimeout(() => {
        this.countdown(counter);
      }, 1000);
    }
  }

  public onClickShowButton(): void {
    this.overlayServerService.showLowerThird(this.selectedOverlay);
  }

  public onClickHideButton(): void {
    this.overlayServerService.hideLowerThird(this.selectedOverlay);
    this.isCountdownStarted = false;
    this.isCountdownPaused = false;
  }
}
