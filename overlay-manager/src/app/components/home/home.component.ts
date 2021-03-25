import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IOverlay } from 'src/app/models/ioverlay';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isClickShowButtonHidden: boolean = true;
  isCountdownPaused: boolean = false;
  countdownTimer = 10;


  constructor(public overlayServerService: OverlayServerService) { }

  selectedOverlay: IOverlay;
  @Output() selectedOverlayChange: EventEmitter<IOverlay>;

  ngOnInit(): void {
  }

  public onClickShow10Button(): void {
    this.overlayServerService.showLowerThird(this.selectedOverlay);
    this.isClickShowButtonHidden = false;
    this.countdown(10);
  }

  public onClickPauseCountdownButton(): void {
    this.isCountdownPaused = true;
  }

  public onClickResumeCountdownButton(): void {
    this.isCountdownPaused = false;
  }

  private countdown(counter: any): void {
    this.countdownTimer = counter
    setTimeout(() => {
      if (counter <= 0) {
        this.overlayServerService.hideLowerThird(this.selectedOverlay);
        this.countdownTimer = 10;
        this.isClickShowButtonHidden = true;
      }
      else {
        if (!this.isCountdownPaused) {
          counter--;

        }
        this.countdown(counter)
      }


    }, 1000);
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
