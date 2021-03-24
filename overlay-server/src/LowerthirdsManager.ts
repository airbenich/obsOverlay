// eslint-disable-next-line import/prefer-default-export
export type Lowerthird = {
    id: number;
    name: string;
    description: string;
    lastChange: string,
  };

export class LowerthirdsManager {
    private lowerthirds: Lowerthird[] = [];

    constructor() {
      this.lowerthirds.push({
        id: 1,
        name: 'Hello World',
        description: 'Subtitle',
        lastChange: '2020-03-24 00:59',
      });
    }

    static test(): string {
      return 'Hello World';
    }

    getAll(): Lowerthird[] {
      return this.lowerthirds;
    }
}
