import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IOverlay } from 'src/app/models/ioverlay';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-overlay-live-control',
  templateUrl: './overlay-live-control.component.html',
  styleUrls: ['./overlay-live-control.component.scss'],
})
export class OverlayLiveControlComponent implements OnInit {
  isOverlayShown = false;
  isAutomationActive = false;
  isAutomationPaused = false;
  automationDuration = new Date(10000);

  currentAutomationDuration: Date;
  currentAutomationStartTime: Date;
  currentRemainingAutomationTime = new Date(this.automationDuration.getTime());
  currentAutomationProgress = 100;
  currentRemainingAutomationTimeString: string;

  @Input() selectedOverlay: IOverlay;

  constructor(public overlayServerService: OverlayServerService) {
    this.generateTimeString();
  }

  ngOnInit(): void {
  }

  private generateTimeString(): void {
    this.currentRemainingAutomationTimeString =
      //      this.currentRemainingAutomationTime.getUTCHours().toString().padStart(2, '0') +
      //      ':' +
      this.currentRemainingAutomationTime
        .getUTCMinutes()
        .toString()
        .padStart(2, '0') +
      ':' +
      this.currentRemainingAutomationTime
        .getUTCSeconds()
        .toString()
        .padStart(2, '0') +
      '.' +
      this.currentRemainingAutomationTime
        .getUTCMilliseconds()
        .toString()
        .padStart(3, '0')
        .slice(0, 2);
  }

  public onClickShow10Button(): void {
    this.startAutomation();
  }

  public onClickPauseCountdownButton(): void {
    this.pauseAutomation();
  }

  public onClickResumeCountdownButton(): void {
    this.resumeAutomation();
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
    // copy automation time to curren tautomation time
    this.currentAutomationDuration = new Date(
      this.automationDuration.getTime()
    );

    // copy automation time to curren remaining time
    this.currentRemainingAutomationTime = new Date(
      this.currentAutomationDuration.getTime()
    );

    // set curren tautomation start time
    this.currentAutomationStartTime = new Date();

    // set automation running
    this.isAutomationActive = true;
    this.isAutomationPaused = false;
    this.showOverlay();

    // start automation runner
    requestAnimationFrame(() => this.updateAutomation());
  }

  private updateAutomation(): void {
    // exect only when automation is still running
    if (this.isAutomationActive && !this.isAutomationPaused) {
      const currentTime = new Date();
      // calculate remaining time
      this.currentRemainingAutomationTime.setTime(
        this.automationDuration.getTime() -
          (currentTime.getTime() - this.currentAutomationStartTime.getTime())
      );

      // calculate percentage progress
      this.currentAutomationProgress =
        (this.currentRemainingAutomationTime.getTime() /
          this.automationDuration.getTime()) *
        100;

      this.generateTimeString();

      // control automation runner – repeat or stop
      if (this.currentRemainingAutomationTime.getTime() > 0) {
        requestAnimationFrame(() => this.updateAutomation());
      } else {
        this.stopAutomation();
      }
    }
  }

  private pauseAutomation(): void {
    this.isAutomationPaused = true;
  }

  private resumeAutomation(): void {
    this.isAutomationPaused = false;
    this.currentAutomationStartTime.setTime(
      new Date().getTime() -
        (this.currentAutomationDuration.getTime() -
          this.currentRemainingAutomationTime.getTime())
    );
    requestAnimationFrame(() => this.updateAutomation());
  }

  private stopAutomation(): void {
    this.hideOverlay();
    this.resetAutomation();
  }

  private resetAutomation(): void {
    this.isAutomationPaused = false;
    this.isAutomationActive = false;
    this.currentRemainingAutomationTime = new Date(
      this.automationDuration.getTime()
    );
    this.currentAutomationProgress = 100;
    this.generateTimeString();
  }

  public onClickShowButton(): void {
    this.showOverlay();
  }

  public onClickHideButton(): void {
    this.hideOverlay();
    this.resetAutomation();
  }
}
