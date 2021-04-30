import { EventEmitter, Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { IOverlay } from 'src/app/models/ioverlay';
import { IChannel } from 'src/app/models/ichannel';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import fileDownload from 'js-file-download';
import { SettingsService } from '../settings/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class OverlayServerService {
  public overlays: IOverlay[] = [];
  public get favoriteOverlays(): IOverlay[] {
    return this.overlays
      .filter((item) => item.favorit && !item.pinnedToTop)
      .sort((a, b) => a.favoritSorting - b.favoritSorting);
  }

  public get pinnedToTopOverlays(): IOverlay[] {
    return this.overlays
      .filter((item) => item.pinnedToTop)
      .sort((a, b) => a.pinnedToTopSorting - b.pinnedToTopSorting);
  }

  public get overlaysWithoutPinnedToTop(): IOverlay[] {
    return this.overlays
      .filter((item) => !item.pinnedToTop)
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  public channels: IChannel[] = [];

  public draftOverlay: IOverlay;

  private getOverlaysSubscription: Subscription;
  private addedOwnOverlaysSubscription: Subscription;

  public serverAvailable: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public overlayWasDeletedWithId: EventEmitter<string> = new EventEmitter();
  public newCreatedOverlay: EventEmitter<IOverlay> = new EventEmitter();

  private initialConnectionMade = false;

  constructor(
    private socket: Socket,
    private settingsService: SettingsService,
    public translate: TranslateService,
    public toastr: ToastrService
  ) {
    this.startConnectionMonitoring();
  }

  public startConnectionMonitoring(): void {
    // on connection
    this.socket.fromEvent('connect').subscribe((observer) => {
      console.log('Successfully connected to Websocket Server');
      this.serverAvailable.next(true);
      this.subscribeToLowerThirds();
      this.subscribeToOwnAddedOverlays();

      // hide the first connection toast
      if (this.initialConnectionMade) {
        this.toastr.success(
          this.translate.instant('The connection was established successful.'),
          this.translate.instant('Connected successful')
        );
      } else {
        this.initialConnectionMade = true;
      }


      this.getChannels().then((data) => (this.channels = data));
    });

    // on disconnect
    this.socket.fromEvent('disconnect').subscribe((observer) => {
      this.serverAvailable.next(false);
      console.error(
        'Lost connection to Websocket Server - Reason: ' + observer
      );

      this.toastr.error(
        this.translate.instant('The connection to the Overlay Server was lost.'),
        this.translate.instant('Connection lost')
      );

      this.overlays = [];

      // unsubscribe from all observables
      // this.getOverlaysSubscription.unsubscribe();
      // this.addedOwnOverlaysSubscription.unsubscribe();
    });
  }

  private subscribeToLowerThirds(): void {
    if (!this.getOverlaysSubscription) {
      this.getOverlaysSubscription = this.socket
        .fromEvent<any[]>('get_lowerthirds')
        .subscribe((lowerThirdsUpdate) => {
          const parsedLowerThirdsUpdate = this.parseLowerThirds(
            lowerThirdsUpdate
          );
          this.syncLowerThirdUpdate(parsedLowerThirdsUpdate);
        });
    }
  }

  private syncLowerThirdUpdate(lowerThirdsUpdate: IOverlay[]): void {
    // delete lower thirds that need to be deleted
    const toBeDeletedLowerThirds = lowerThirdsUpdate.filter(
      (lowerThird) => lowerThird.deleted
    );
    toBeDeletedLowerThirds.forEach((toBeDeletedLowerThird) => {
      this.overlayWasDeletedWithId.emit(toBeDeletedLowerThird.id);
      this.overlays = this.overlays.filter((overlay) => {
        return overlay.id !== toBeDeletedLowerThird.id;
      });
    });

    // add or update the rest
    const newOrUpdatedlowerThirds = lowerThirdsUpdate.filter(
      (overlay) => !overlay.deleted
    );

    newOrUpdatedlowerThirds.forEach((newOrUpdatedOverlay) => {
      let wasUpdated = false;
      this.overlays.forEach((overlay, index) => {
        if (overlay.id === newOrUpdatedOverlay.id) {
          Object.assign(this.overlays[index], newOrUpdatedOverlay);
          wasUpdated = true;
        }
      });

      if (!wasUpdated) {
        this.overlays.push(newOrUpdatedOverlay);
      }
    });
  }

  public updateLowerThird(data: IOverlay): void {
    this.socket.emit('update_lowerthird', data);
  }

  public addLowerThird(data: IOverlay): void {
    this.socket.emit('add_lowerthird', data);
  }

  private subscribeToOwnAddedOverlays(): void {
    this.addedOwnOverlaysSubscription = this.socket
      .fromEvent<any>('add_lowerthird')
      .subscribe((data) => {
        const newlyCreatedOverlay = this.parseLowerThirds([data])[0];
        this.overlays.push(newlyCreatedOverlay);
        this.newCreatedOverlay.emit(newlyCreatedOverlay);
      });
  }

  public removeLowerThird(data: IOverlay): void {
    this.socket.emit('remove_lowerthird', data);
  }

  public showLowerThird(lowerThird: IOverlay): void {
    this.socket.emit('content', {
      type: 'lowerThird',
      content: {
        action: 'show',
        element: lowerThird,
      },
    });
  }

  public hideLowerThird(lowerThird: IOverlay): void {
    this.socket.emit('content', {
      type: 'lowerThird',
      content: {
        action: 'hide',
        element: lowerThird,
      },
    });
  }

  private parseLowerThirds(lowerThirds: any[]): IOverlay[] {
    return lowerThirds.map((element) => {
      const parsed = {};
      Object.assign(parsed, element);
      return parsed as IOverlay;
    });
  }

  public getChannels(): Promise<IChannel[]> {
    return this.socket
      .fromOneTimeEvent<any[]>('get_channels')
      .then((channels) => this.parseChannels(channels));
  }

  private parseChannels(channels: any[]): IChannel[] {
    return channels.map((element) => {
      const parsed = {};
      Object.assign(parsed, element);
      return parsed as IChannel;
    });
  }

  public cleanUpLowerThirds(): void {
    this.overlays.forEach((lowerThird) => {
      if (!lowerThird.readOnly) {
        this.removeLowerThird(lowerThird);
      }
    });
  }

  public sortingChanged(
    event: any,
    sortedArray: IOverlay[],
    sortKey: string
  ): void {
    const temp = sortedArray[event.previousIndex];
    sortedArray[event.previousIndex] = sortedArray[event.currentIndex];
    sortedArray[event.currentIndex] = temp;

    sortedArray.forEach((item, index) => {
      item[sortKey] = index;
      this.updateLowerThird(item);
    });
  }

  public getExportFile(onlyFavoriteOverlays: boolean): void {
    let overlays: IOverlay[];
    if (onlyFavoriteOverlays) {
      overlays = this.overlays.filter((overlay) => overlay.favorit)
    } else {
      overlays = this.overlays;
    }

    const exportData = {
      overlays: overlays,
    };
    let filename = new Date().toISOString();
    filename += '_overlay-manager-export';
    filename += '.json';
    fileDownload(JSON.stringify(exportData), filename);
  }

  public importJSONString(jsonString: string, overwrite: boolean): void {
    const importObject = JSON.parse(jsonString);
    if (importObject.overlays) {
      const overlays = importObject.overlays as IOverlay[];
      overlays.forEach((overlay) => {
        console.log(overlay);
        if (!overwrite) {
          delete overlay.id;
        }
        this.addLowerThird(overlay);
      });
    }
  }

  public clearForImport(): void {
    this.overlays.forEach((overlay) => {
      this.removeLowerThird(overlay);
    });
  }

  public connect(): void {
    this.socket.ioSocket.io.opts.query =
      'authentication=' + this.settingsService.settings.websocket.authCode;
    this.socket.ioSocket.io.uri =
      'http://' +
      this.settingsService.settings.websocket.host +
      ':' +
      this.settingsService.settings.websocket.port;
    this.socket.connect();
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}
