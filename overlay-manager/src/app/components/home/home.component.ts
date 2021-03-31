import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IOverlay } from 'src/app/models/ioverlay';
import { HotkeyService } from 'src/app/shared/services/hotkey/hotkey.service';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    public overlayServerService: OverlayServerService,
    private hotkeyService: HotkeyService
  ) {}
  selectedOverlay: IOverlay;
  @Output() selectedOverlayChange: EventEmitter<IOverlay>;
  newCreatedOverlaySubscription: Subscription;

  ngOnInit(): void {
    this.hotkeyService.addShortcut({ keys: 'esc' }).subscribe(() => {
      this.closeOverlay();
    });

    // open overlay when newly created
    this.overlayServerService.newCreatedOverlay.subscribe(overlay => {
      this.selectedOverlay = overlay;
    });
  }

  ngOnDestroy(): void {
    this.newCreatedOverlaySubscription.unsubscribe();
  }

  public overlaySelected(overlay: IOverlay): void {
    this.selectedOverlay = overlay;
  }

  public closeOverlay(): void {
    delete this.selectedOverlay;
  }
}
