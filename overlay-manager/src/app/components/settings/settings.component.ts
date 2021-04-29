import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';
import isElectron from 'is-electron';
import { ModalService } from 'src/app/shared/components/modal';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  ngOnInit(): void {
    this.overlayServerService.serverAvailable.subscribe((value) => this.disableConnectionSettings = value);
  }
  iselectron = false;
  importFile: string;
  fileCantBeImported: true | null = true;
  languages = null
  disableConnectionSettings = true;

  constructor(
    public settingsService: SettingsService,
    public overlayServerService: OverlayServerService,
    private modalService: ModalService,
    private translate: TranslateService
  ) {
    this.iselectron = isElectron();
    this.languages = ["en", "de", "ru"]
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  public onUserConfirmedOberlayCleanUp(id: string): void {
    this.overlayServerService.cleanUpLowerThirds();
    this.closeModal(id);
  }

  setLanguage(language: string): void {
    this.settingsService.settings["language"] = language;
    this.settingsService.saveToStorage();
    this.translate.use(language);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onUserClickConnect(): void {
    this.settingsService.saveToStorage();
    this.overlayServerService.connect();
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
