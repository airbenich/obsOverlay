import { Component } from '@angular/core';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'overlay-manager';

  constructor(
    public settingsService: SettingsService,
    private translate: TranslateService
  ) {
    settingsService.loadFromStorage()
    this.translate.use(settingsService.settings['language']);
  }

}
