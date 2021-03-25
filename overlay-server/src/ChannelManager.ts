/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
import storedChannels from './channels.json';

const fs = require('fs');
const colors = require('colors/safe');

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
    const json = JSON.stringify(this.channels);
    fs.writeFile('channels.json', json, (err: any) => {
      if (err) throw err;
      console.log('Channels stored');
    });
  }

  private loadChannels() {
    this.channels = storedChannels;
    console.log(colors.gray('Channels loaded'));
  }

  public getChannels(): Channel[] {
    return this.channels;
  }
}
