import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ISettings, IWebsocketConfig } from 'src/app/models/isettings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: ISettings;
  pristineSettings: ISettings;
  isConfigAvailable: boolean;

  private settingsDefault = {
    websocket: {
      host: 'localhost',
      port: 3000,
      authCode: 'sDJZn16TuP7zu82a',
    },
  } as ISettings;

  private localStorageKey = 'overlay-manager-settings';

  constructor(private socket: Socket) {
    this.loadFromStorage();
  }

  public loadFromStorage(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (!data) {
      console.warn(
        'No data available in local storage with key: ' + this.localStorageKey
      );
      console.warn('Loading default data for: ' + this.localStorageKey);
      this.settings = JSON.parse(JSON.stringify(this.settingsDefault));
      this.pristineSettings = JSON.parse(JSON.stringify(this.settingsDefault));
      return;
    }
    try {
      this.settings = JSON.parse(data);
      this.pristineSettings = JSON.parse(JSON.stringify(this.settings));
      this.isConfigAvailable = true;
    } catch (error) {
      console.error(
        'Error parsing local storage data with key: ' + this.localStorageKey
      );
    }
  }

  public saveToStorage(): void {
    if (!this.settings) {
      console.error("Can't save empty settings");
      return;
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.settings));
    this.isConfigAvailable = true;
    this.pristineSettings = JSON.parse(JSON.stringify(this.settings));
  }

  public clearStorage(): void {
    localStorage.removeItem(this.localStorageKey);
    delete this.settings;
    this.loadFromStorage();
    this.isConfigAvailable = false;
  }

  public areSettingsPristine(): boolean {
    return (
      JSON.stringify(this.settings) === JSON.stringify(this.pristineSettings)
    );
  }
}
