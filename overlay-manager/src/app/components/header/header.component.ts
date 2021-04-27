import { Component, OnInit } from '@angular/core';
import isElectron from 'is-electron';
import { ModalService } from 'src/app/shared/components/modal';
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
    private modalService: ModalService
  ) {
    this.iselectron = isElectron();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  public onUserConfirmedOberlayCleanUp(id: string): void {
    this.overlayServerService.cleanUpLowerThirds();
    this.closeModal(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  ngOnInit(): void {}
}
