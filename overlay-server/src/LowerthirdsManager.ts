/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
import storedLoverthirds from './loverthirds.json';
import storedChannels from './channels.json';

var fs = require('fs');

export type Lowerthird = {
  id: number | null;
  title: string | null;
  subtitle: string | null;
  lastChange: string | null,
  pinnedToTop: boolean;
  sort: number | null;
  favorit: boolean | null;
  readOnly: boolean | null;
};

export class LowerthirdsManager {
  private lowerthirds: Lowerthird[] = [];
  private idCounter: number = 1;

  constructor() {
    this.loadLowerthirds();
  }

  public add(lowerthird: Lowerthird): void {
    lowerthird.lastChange = new Date().toJSON().slice(0, 19).replace('T', ' ');
    lowerthird.id = this.idCounter;
    this.idCounter += 1;
    this.lowerthirds.push(lowerthird);
    this.store();
  }

  public update(lowerthird: Lowerthird): void {
    lowerthird.lastChange = new Date().toJSON().slice(0, 19).replace('T', ' ');

    // Search for a lowerthird with the specific item
    if (lowerthird.id) {
      const temp = this.lowerthirds.find((item) => item.id === lowerthird.id);

      // Update data
      if (temp) {
        this.lowerthirds[this.lowerthirds.indexOf(temp)] = lowerthird;
        console.log(this.lowerthirds);
      }
    }
    this.store();
  }

  public remove(lowerthird: Lowerthird): void {
    // Search for a lowerthird with the specific item
    if (lowerthird.id) {
      const temp = this.lowerthirds.find((item) => item.id === lowerthird.id);

      // remove lowerthird
      if (temp) {
        const index = this.lowerthirds.indexOf(temp);
        if (index > -1) {
          this.lowerthirds.splice(index, 1);
        }
      }
    }
    this.store();
  }

  private store() {
    let json = JSON.stringify(this.lowerthirds);
    fs.writeFile("loverthirds.json", json, function (err: any) {
      if (err) throw err;
      console.log('Lowerthirds stored');
    }
    );
  }

  private loadLowerthirds() {
    this.lowerthirds = storedLoverthirds;
    console.log("Lowerthirds loaded");
  }

  public getLowerThirds(): Lowerthird[] {
    return this.lowerthirds;
  }
}
