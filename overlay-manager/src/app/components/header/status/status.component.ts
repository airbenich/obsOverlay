import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OverlayServerService } from 'src/app/shared/services/overlay-server/overlay-server.service';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';
import { Status } from './status';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit, OnDestroy {
  status: Status[] = [
    {
      service: 'Overlay Server',
      status: 'connecting',
    },
    // {
    //   service: 'Livestream Software OBS',
    //   status: 'connecting',
    // },
  ];

  private overlayServerStatusSubscription: Subscription;

  constructor(private overlayServerService: OverlayServerService, public settingsService: SettingsService) {}

  ngOnInit(): void {
    this.subscribeToStates();
  }

  ngOnDestroy(): void {
    this.overlayServerStatusSubscription.unsubscribe();
  }

  subscribeToStates(): void {
    this.overlayServerStatusSubscription = this.overlayServerService.serverAvailable.subscribe(
      (status) => {
        const overlayServerStatus = this.status.filter(
          (data) => data.service === 'Overlay Server'
        )[0];
        overlayServerStatus.status = status ? 'online' : 'offline';
      }
    );
  }
}
