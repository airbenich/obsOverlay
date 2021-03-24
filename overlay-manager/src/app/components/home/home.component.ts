import { Component, EventEmitter, OnInit } from '@angular/core';
import { IOverlay } from 'src/app/models/ioverlay';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
