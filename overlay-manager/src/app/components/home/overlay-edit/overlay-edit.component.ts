import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  throttleTime,
} from 'rxjs/operators';
import { IOverlay } from 'src/app/models/ioverlay';
import { HotkeyService } from 'src/app/shared/services/hotkey/hotkey.service';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-overlay-edit',
  templateUrl: './overlay-edit.component.html',
  styleUrls: ['./overlay-edit.component.scss'],
})
export class OverlayEditComponent implements OnInit, OnDestroy {
  isDraft: boolean;
  @Input() set selectedOverlay(value: IOverlay) {
    this.privateSelectedOverlay = value;
    this.selectedOverlayChanged();
  }
  get selectedOverlay(): IOverlay {
    return this.privateSelectedOverlay;
  }
  privateSelectedOverlay: IOverlay;
  @Output() closedOverlay: EventEmitter<void> = new EventEmitter();
  formDataChanged: Subject<string> = new Subject<string>();
  overlayWasDeletedWithIdSubscription: Subscription;

  constructor(
    public overlayServerService: OverlayServerService,
    public hotkeyService: HotkeyService
  ) {}

  ngOnInit(): void {
    this.overlayWasDeletedWithIdSubscription = this.overlayServerService.overlayWasDeletedWithId.subscribe(
      (id) => {
        if (id === this.selectedOverlay.id) {
          this.closeOverlay();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.hotkeyService.lockTypingHotkeys = false;
    this.overlayWasDeletedWithIdSubscription.unsubscribe();
  }

  public debouncedFormChange(): void {
    if (!this.isDraft) {
      if (this.formDataChanged.observers.length === 0) {
        this.formDataChanged.pipe(debounceTime(1000)).subscribe(() => {
          this.overlayServerService.updateLowerThird(this.selectedOverlay);
        });
      }
      this.formDataChanged.next();
    }
  }

  public instantFormChange(): void {
    if (!this.isDraft) {
      this.overlayServerService.updateLowerThird(this.selectedOverlay);
    }
  }

  private selectedOverlayChanged(): void {
    this.isDraft =
      this.overlayServerService.draftOverlay === this.selectedOverlay;
  }

  public closeOverlay(): void {
    this.closedOverlay.emit();
    delete this.selectedOverlay;
  }

  public onClickSaveButton(): void {
    this.overlayServerService.addLowerThird(this.selectedOverlay);
    delete this.overlayServerService.draftOverlay;
    this.closeOverlay();
  }

  public onClickDeleteButton(): void {
    this.overlayServerService.removeLowerThird(this.selectedOverlay);
    this.closeOverlay();
  }

  public onClickCancelButton(): void {
    delete this.overlayServerService.draftOverlay;
    this.closeOverlay();
  }
}
