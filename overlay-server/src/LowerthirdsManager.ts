const storage = require('node-persist');

const fs = require('fs');
const { v4: uuid } = require('uuid');
const colors = require('colors/safe');

export type IOverlay = {
  id: string | null;
  title: string | null;
  subtitle: string | null;
  lastChange: string | null,
  pinnedToTop: boolean;
  sort?: number | null;
  favorit: boolean | null;
  readOnly: boolean | null;
  deleted?: boolean | null;
};

export class LowerthirdsManager {
  private lowerthirds: IOverlay[] = [];

  private storageKey = 'overlay-server-storage';

  private storagePath = 'storage/lowerThirds/';

  private autoSaveRunner: NodeJS.Timeout | undefined;

  private autoSaveRunnerTime = 1000 * 5;

  private autoSaveLastSave: string | undefined;

  constructor() {
    // Load initially all lower thirds from the file
    this.load();
    this.startAutoSave();
  }

  private startAutoSave() {
    this.autoSaveRunner = setInterval(() => {
      if (this.autoSaveLastSave !== JSON.stringify(this.lowerthirds)) {
        console.log(colors.gray('Changes detected'));
        this.store();
      }
    }, this.autoSaveRunnerTime);
  }

  private stopAutoSave() {
    if (this.autoSaveRunner) {
      clearInterval(this.autoSaveRunner);
    }
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

  private async store(): Promise<void> {
    if (storage.setItem) {
      this.autoSaveLastSave = JSON.stringify(this.lowerthirds);
      await storage.setItem(this.storageKey, this.lowerthirds);
      console.log(colors.gray('Lowerthirds stored'));
    }
  }

  private async load(): Promise<void> {
    // you must first call storage.init
    await storage.init({
      dir: this.storagePath,
    });

    const data = await storage.getItem(this.storageKey);
    if (data) {
      this.lowerthirds = data;
      console.log(colors.gray('Lowerthirds loaded'));
    } else {
      this.store();
      console.log(colors.gray('Lowerthirds initialized'));
    }
  }

  public getAll(): IOverlay[] {
    return this.lowerthirds;
  }
}
