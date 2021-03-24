/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
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
      this.add({
        id: null,
        title: 'Hello World',
        subtitle: 'Subtitle',
        lastChange: '2020-03-24 00:59',
        favorit: false,
        pinnedToTop: false,
        readOnly: false,
        sort: null,
      });
      this.add({
        id: null,
        title: 'Max Mustermann',
        subtitle: 'Mustertechniker',
        lastChange: '2020-03-24 00:59',
        favorit: false,
        pinnedToTop: false,
        readOnly: false,
        sort: null,
      });
      this.add({
        id: null,
        title: 'Freiherr von Bauch',
        subtitle: 'Bauchbinder',
        lastChange: '2020-03-24 00:59',
        favorit: false,
        pinnedToTop: false,
        readOnly: false,
        sort: null,
      });
      this.add({
        id: null,
        title: 'Peter Pan',
        subtitle: 'Pantologe',
        lastChange: '2020-03-24 00:59',
        favorit: false,
        pinnedToTop: false,
        readOnly: false,
        sort: null,
      });
      this.add({
        id: null,
        title: 'Live-Chat',
        subtitle: 'www.auf-der-hoehe.de/livestream',
        lastChange: '2020-03-24 00:59',
        favorit: false,
        pinnedToTop: true,
        readOnly: true,
        sort: null,
      });
      this.add({
        id: null,
        title: 'Unterstützen',
        subtitle: 'www.auf-der-hoehe.de/unterstuetzen',
        lastChange: '2020-03-24 00:59',
        favorit: false,
        pinnedToTop: true,
        readOnly: true,
        sort: null,
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
