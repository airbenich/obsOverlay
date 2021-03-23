import { Component, EventEmitter, OnInit } from '@angular/core';
import { IOverlay } from 'src/app/models/ioverlay';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  selectedOverlay: IOverlay;

  ngOnInit(): void {
  }

  public overlaySelected(overlay: IOverlay): void {
    this.selectedOverlay = overlay;

  }

  public closeOverlay(): void {
    delete this.selectedOverlay;
  }

}
