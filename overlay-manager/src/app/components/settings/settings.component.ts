import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';
import isElectron from 'is-electron';
import { ModalService } from 'src/app/shared/components/modal';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  ngOnInit(): void {}
  iselectron = false;
  importFile: string;
  fileCantBeImported: true | null = true;

  constructor(
    public settingsService: SettingsService,
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

  onUserClickSaveButton(): void {
    this.settingsService.saveToStorage();
  }

  onUserClickCancelButton(): void {
    this.settingsService.loadFromStorage();
  }

  onUserClickResetConfig(): void {
    this.settingsService.clearStorage();
  }

  onUserClickImportAndOverwriteFile(): void {
    this.overlayServerService.clearForImport();
    this.overlayServerService.importJSONString(this.importFile, true);
    this.closeModal('importModal');
  }
  onUserClickImportAndMergeFile(): void {
    this.overlayServerService.importJSONString(this.importFile, false);
    this.closeModal('importModal');
  }

  handleFileInput(files: FileList) {
    files
      .item(0)
      .text()
      .then((data) => {
        if (data) {
          this.importFile = data;
          this.fileCantBeImported = null;
        } else {
          this.fileCantBeImported = true;
        }
      });
  }
}
