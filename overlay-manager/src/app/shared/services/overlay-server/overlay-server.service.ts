import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IOverlay } from 'src/app/models/ioverlay';
import { IChannel } from 'src/app/models/ichannel';
import { Subject, Subscription } from 'rxjs';
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

  public serverAvailable: Subject<boolean> = new Subject();

  public overlayWasDeletedWithId: EventEmitter<string> = new EventEmitter();
  public newCreatedOverlay: EventEmitter<IOverlay> = new EventEmitter();

  constructor(private socket: Socket) {
    this.startConnectionMonitoring();
  }

  private startConnectionMonitoring(): void {
    // on connection
    this.socket.fromEvent('connect').subscribe((observer) => {
      console.log('Successfully connected to Websocket Server');
      this.serverAvailable.next(true);
      this.subscribeToLowerThirds();
      this.subscribeToOwnAddedOverlays();

      this.getChannels().then((data) => (this.channels = data));
    });

    // on disconnect
    this.socket.fromEvent('disconnect').subscribe((observer) => {
      this.serverAvailable.next(false);
      console.error(
        'Lost connection to Websocket Server - Reason: ' + observer
      );

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

  public sortingChanged(event: any, sortedArray: IOverlay[], sortKey: string): void {
    const temp = sortedArray[event.previousIndex];
    sortedArray[event.previousIndex] = sortedArray[event.currentIndex];
    sortedArray[event.currentIndex] = temp;

    sortedArray.forEach((item, index) => {
      item[sortKey] = index;
      this.updateLowerThird(item);
    });
  }
}
