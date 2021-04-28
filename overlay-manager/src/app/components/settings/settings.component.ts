import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(public settingsService: SettingsService) {}

  ngOnInit(): void {}

  onUserClickSaveButton(): void {
    this.settingsService.saveToStorage();
  }

  onUserClickCancelButton(): void {
    this.settingsService.loadFromStorage();
  }

  onUserClickResetConfig(): void {
    this.settingsService.clearStorage();
  }
}
