/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
export type Lowerthird = {
    id: number | null;
    name: string | null;
    description: string | null;
    lastChange: string | null,
  };

export class LowerthirdsManager {
    private lowerthirds: Lowerthird[] = [];

    private idCounter: number = 1;

    constructor() {
      this.lowerthirds.push({
        id: 0,
        name: 'Hello World',
        description: 'Subtitle',
        lastChange: '2020-03-24 00:59',
      });
    }

    public add(lowerthird: Lowerthird): void {
      lowerthird.lastChange = new Date().toJSON().slice(0, 19).replace('T', ' ');
      lowerthird.id = this.idCounter;
      this.idCounter += 1;
      this.lowerthirds.push(lowerthird);
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
    }

    public getAll(): Lowerthird[] {
      return this.lowerthirds;
    }
}