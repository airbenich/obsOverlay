import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOverlay } from 'src/app/models/ioverlay';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-overlay-edit',
  templateUrl: './overlay-edit.component.html',
  styleUrls: ['./overlay-edit.component.scss']
})
export class OverlayEditComponent implements OnInit {
  @Input() selectedOverlay: IOverlay;
  @Output() closedOverlay: EventEmitter<void> = new EventEmitter();

  constructor(public overlayServerService: OverlayServerService) { }

  ngOnInit(): void {
  }

  public closeOverlay(): void {
    this.closedOverlay.emit();
    delete this.selectedOverlay;
  }

  public onClickDeleteButton(): void {
    this.overlayServerService.removeLowerThird(this.selectedOverlay);
  }

  public selectedOverlayChange(): void {
    console.log('changed');
  }

}
