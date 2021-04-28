import { Component, OnInit } from '@angular/core';
import isElectron from 'is-electron';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  iselectron = false;
  constructor(
    public overlayServerService: OverlayServerService,
  ) {
    this.iselectron = isElectron();
  }

  ngOnInit(): void {}
}
