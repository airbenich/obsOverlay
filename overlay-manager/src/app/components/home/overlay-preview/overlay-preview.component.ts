import { Component, Input, OnInit } from '@angular/core';
import { IOverlay } from 'src/app/models/ioverlay';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-overlay-preview',
  templateUrl: './overlay-preview.component.html',
  styleUrls: ['./overlay-preview.component.css'],
})
export class OverlayPreviewComponent implements OnInit {
  @Input() selectedOverlay: IOverlay;

  constructor(public overlayServerService: OverlayServerService) {}

  ngOnInit(): void {}
}
