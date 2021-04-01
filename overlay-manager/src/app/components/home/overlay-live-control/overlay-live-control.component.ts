import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IOverlay } from 'src/app/models/ioverlay';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-overlay-live-control',
  templateUrl: './overlay-live-control.component.html',
  styleUrls: ['./overlay-live-control.component.scss'],
})
export class OverlayLiveControlComponent implements OnInit, OnDestroy {
  isOverlayShown = false;
  isAutomationActive = false;
  isAutomationPaused = false;
  automationDuration = new Date(10000);
  currentAutomationTime = new Date(this.automationDuration.getTime());
  currentAutomationProgress = 100;
  currentAutomationTimeString: string;

  automationClock: NodeJS.Timeout;
  automationClockTickTime = 10;

  @Input() selectedOverlay: IOverlay;

  constructor(public overlayServerService: OverlayServerService) {
    this.calculateTimes();
  }

  ngOnDestroy(): void {
    clearInterval(this.automationClockTickTime);
  }

  ngOnInit(): void {
    this.automationClock = setInterval(
      () => this.clockTick(),
      this.automationClockTickTime
    );
  }

  private clockTick(): void {
    if (this.isAutomationActive && !this.isAutomationPaused) {
      this.currentAutomationTime.setTime(
        this.currentAutomationTime.getTime() - this.automationClockTickTime
      );
      this.currentAutomationProgress =
        (this.currentAutomationTime.getTime() /
          this.automationDuration.getTime()) *
        100;
      this.calculateTimes();
      if (this.currentAutomationTime.getTime() <= 0) {
        this.stopAutomation();
      }
    }
  }

  private calculateTimes(): void {
    this.currentAutomationTimeString =
//      this.currentAutomationTime.getUTCHours().toString().padStart(2, '0') +
//      ':' +
      this.currentAutomationTime.getUTCMinutes().toString().padStart(2, '0') +
      ':' +
      this.currentAutomationTime.getUTCSeconds().toString().padStart(2, '0') +
      ':' +
      this.currentAutomationTime
        .getUTCMilliseconds()
        .toString()
        .padStart(3, '0')
        .slice(0, 2);
  }

  public onClickShow10Button(): void {
    this.startAutomation();
  }

  public onClickPauseCountdownButton(): void {
    this.isAutomationPaused = true;
  }

  public onClickResumeCountdownButton(): void {
    this.isAutomationPaused = false;
  }

  private showOverlay(): void {
    this.isOverlayShown = true;
    this.overlayServerService.showLowerThird(this.selectedOverlay);
  }

  private hideOverlay(): void {
    this.isOverlayShown = false;
    this.overlayServerService.hideLowerThird(this.selectedOverlay);
  }

  private startAutomation(): void {
    this.currentAutomationTime = new Date(this.automationDuration.getTime());
    this.isAutomationActive = true;
    this.isAutomationPaused = false;
    this.showOverlay();
  }

  private stopAutomation(): void {
    this.hideOverlay();
    this.resetAutomation();
  }

  private resetAutomation(): void {
    this.isAutomationPaused = false;
    this.isAutomationActive = false;
    this.currentAutomationTime = new Date(this.automationDuration.getTime());
    this.currentAutomationProgress = 100;
    this.calculateTimes();
  }

  public onClickShowButton(): void {
    this.showOverlay();
  }

  public onClickHideButton(): void {
    this.hideOverlay();
    this.resetAutomation();
  }
}
