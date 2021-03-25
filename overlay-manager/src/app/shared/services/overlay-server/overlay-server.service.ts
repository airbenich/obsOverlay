import { Injectable } from '@angular/core';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { IOverlay } from 'src/app/models/ioverlay';
import { IChannel } from 'src/app/models/ichannel';

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
      this.getLowerThirds().then((data) => (this.overlays = data));
      this.getChannels().then((data) => (this.channels = data));
    });

    // on disconnect
    this.socket.fromEvent('disconnect').subscribe((observer) => {
      console.error(
        'Lost connection to Websocket Server - Reason: ' + observer
      );
    });
  }

  public getLowerThirds(): Promise<IOverlay[]> {
    return this.socket
      .fromOneTimeEvent<any[]>('get_lowerthirds')
      .then((lowerThirds) => this.parseLowerThirds(lowerThirds));
  }

  public updateLowerThird(data: IOverlay): void {
    this.socket.emit('update_lowerthird', data);
    this.getLowerThirds().then((lowerThirds) => (this.overlays = lowerThirds));
  }

  public addLowerThird(data: IOverlay): void {
    this.socket.emit('add_lowerthird', data);
    this.getLowerThirds().then((lowerThirds) => (this.overlays = lowerThirds));
  }

  public removeLowerThird(data: IOverlay): void {
    this.socket.emit('remove_lowerthird', data);
    this.getLowerThirds().then((lowerThirds) => (this.overlays = lowerThirds));
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
