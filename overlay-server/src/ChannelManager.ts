/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
import storedChannels from './channels.json';

var fs = require('fs');

export type Channel = {
  id: number | null;
  title: string | null;
}

export class ChannelManager {
  private channels: Channel[] = [];
  private idCounter: number = 1;

  constructor() {
    this.loadChannels();
  }



  private store() {
    let json = JSON.stringify(this.channels);
    fs.writeFile("channels.json", json, function (err: any) {
      if (err) throw err;
      console.log('Channels stored');
    }
    );
  }

  private loadChannels() {
    this.channels = storedChannels;
    console.log("Channels loaded");
  }

  public getChannels(): Channel[] {
    return this.channels;
  }
}
