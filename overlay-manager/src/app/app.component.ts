import { Component } from '@angular/core';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { OverlayServerService } from './shared/services/overlay-server/overlay-server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'overlay-manager';

  constructor(
    public settingsService: SettingsService,
    private translate: TranslateService,
    private overlayServerService: OverlayServerService
  ) {
    settingsService.loadFromStorage()
    this.translate.use(settingsService.settings['language']);
    this.overlayServerService.connect();
  }

}
