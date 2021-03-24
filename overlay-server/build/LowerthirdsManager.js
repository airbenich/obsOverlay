"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowerthirdsManager = void 0;
class LowerthirdsManager {
    constructor() {
        this.lowerthirds = [];
        this.idCounter = 1;
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
    add(lowerthird) {
        lowerthird.lastChange = new Date().toJSON().slice(0, 19).replace('T', ' ');
        lowerthird.id = this.idCounter;
        lowerthird.favorit = false;
        this.idCounter += 1;
        this.lowerthirds.push(lowerthird);
    }
    update(lowerthird) {
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
    remove(lowerthird) {
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
    getAll() {
        return this.lowerthirds;
    }
}
exports.LowerthirdsManager = LowerthirdsManager;
