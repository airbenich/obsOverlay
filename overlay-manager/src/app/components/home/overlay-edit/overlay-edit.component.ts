import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IOverlay } from 'src/app/models/ioverlay';
import { HotkeyService } from 'src/app/shared/services/hotkey/hotkey.service';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-overlay-edit',
  templateUrl: './overlay-edit.component.html',
  styleUrls: ['./overlay-edit.component.scss'],
})
export class OverlayEditComponent implements OnInit, OnDestroy {
  @Input() selectedOverlay: IOverlay;
  @Output() closedOverlay: EventEmitter<void> = new EventEmitter();

  constructor(
    public overlayServerService: OverlayServerService,
    public hotkeyService: HotkeyService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.hotkeyService.lockTypingHotkeys = false;
  }

  public closeOverlay(): void {
    this.closedOverlay.emit();
    delete this.selectedOverlay;
  }

  public onClickDeleteButton(): void {
    this.overlayServerService.removeLowerThird(this.selectedOverlay);
  }

  public onClickCancelButton(): void {
    delete this.overlayServerService.draftOverlay;
    this.closeOverlay();
  }

  public selectedOverlayChange(): void {
    console.log('changed');
  }
}
