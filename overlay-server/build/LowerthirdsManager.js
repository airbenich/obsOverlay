"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowerthirdsManager = void 0;
class LowerthirdsManager {
    constructor() {
        this.lowerthirds = [];
        this.idCounter = 1;
        this.lowerthirds.push({
            id: 0,
            name: 'Hello World',
            description: 'Subtitle',
            lastChange: '2020-03-24 00:59',
        });
    }
    add(lowerthird) {
        lowerthird.lastChange = new Date().toJSON().slice(0, 19).replace('T', ' ');
        lowerthird.id = this.idCounter;
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
