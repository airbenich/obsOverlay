import { Injectable } from '@angular/core';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { IOverlay } from 'src/app/models/ioverlay';
import { IChannel } from 'src/app/models/ichannel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayServerService {
  public overlays: IOverlay[] = [];
  public channels: IChannel[] = [];

  public draftOverlay: IOverlay;

  constructor(private socket: Socket) {
    this.startConnectionMonitoring();
  }

  private startConnectionMonitoring(): void {
    // on connection
    this.socket.fromEvent('connect').subscribe((observer) => {
      console.log('Successfully connected to Websocket Server');
      this.subscribeToLowerThirds();

      this.getChannels().then((data) => (this.channels = data));
    });

    // on disconnect
    this.socket.fromEvent('disconnect').subscribe((observer) => {
      console.error(
        'Lost connection to Websocket Server - Reason: ' + observer
      );
    });
  }

  private subscribeToLowerThirds(): void {
    this.socket
      .fromEvent<any[]>('get_lowerthirds')
      .subscribe((lowerThirdsUpdate) => {
        const parsedLowerThirdsUpdate = this.parseLowerThirds(
          lowerThirdsUpdate
        );
        this.syncLowerThirdUpdate(parsedLowerThirdsUpdate);
      });
  }

  private syncLowerThirdUpdate(lowerThirdsUpdate: IOverlay[]): void {
    // delete lower thirds that need to be deleted
    const toBeDeletedLowerThirds = lowerThirdsUpdate.filter(
      (lowerThird) => lowerThird.deleted
    );
    toBeDeletedLowerThirds.forEach((toBeDeletedLowerThird) => {
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
}
