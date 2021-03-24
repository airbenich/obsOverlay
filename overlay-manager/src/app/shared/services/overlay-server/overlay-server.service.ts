import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IOverlay } from 'src/app/models/ioverlay';

@Injectable({
  providedIn: 'root'
})
export class OverlayServerService {
  public overlays: IOverlay[];

  constructor(private socket: Socket) {
  }

  public getLowerThirds(): Promise<IOverlay[]> {
    return this.socket.fromOneTimeEvent<any[]>('get_lowerthirds').then(lowerThirds => this.parseLowerThirds(lowerThirds));
  }

  private parseLowerThirds(lowerThirds: any[]): IOverlay[] {
    return lowerThirds.map((element) => {
      return {
        id: element.id,
        design: '',
        lastChange: element.lastChange,
        subtitle: element.subtitle,
        title: element.title
      } as IOverlay;
    });
  }

}
