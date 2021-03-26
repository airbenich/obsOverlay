/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
import config from './config.json';
import storedLowerthirds from './lowerthirds.json';

const fs = require('fs');
const { v4: uuid } = require('uuid');
const colors = require('colors/safe');

export type IOverlay = {
  id: number | null;
  title: string | null;
  subtitle: string | null;
  lastChange: string | null,
  pinnedToTop: boolean;
  sort: number | null;
  favorit: boolean | null;
  readOnly: boolean | null;
  deleted: boolean;
};

export class LowerthirdsManager {
  private lowerthirds: IOverlay[] = [];

  constructor() {
    // Load initially all lower thirds from the file
    this.load();
  }

  public add(lowerthird: IOverlay): IOverlay {
    lowerthird.lastChange = new Date().toJSON().slice(0, 19).replace('T', ' ');
    lowerthird.id = uuid();
    this.lowerthirds.push(lowerthird);
    this.store();

    return lowerthird;
  }

  public update(lowerthird: IOverlay): IOverlay {
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

    return lowerthird;
  }

  public remove(lowerthird: IOverlay): void {
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

  private store(): void {
    const json = JSON.stringify(this.lowerthirds);

    // Uses the sync version to prevent congruent file writing
    fs.writeFileSync('lowerthirds.json', json);
    console.log(colors.gray('Lowerthirds stored'));
  }

  private load(): void {
    this.lowerthirds = storedLowerthirds;
    console.log(colors.gray('Lowerthirds loaded'));
  }

  public getAll(): IOverlay[] {
    return this.lowerthirds;
  }
}
