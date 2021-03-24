"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowerthirdsManager = void 0;
class LowerthirdsManager {
    constructor() {
        this.lowerthirds = [];
        this.lowerthirds.push({
            id: 1,
            name: 'Hello World',
            description: 'Subtitle',
            lastChange: '2020-03-24 00:59',
        });
    }
    static test() {
        return 'Hello World';
    }
    getAll() {
        return this.lowerthirds;
    }
}
exports.LowerthirdsManager = LowerthirdsManager;
//# sourceMappingURL=LowerthirdsManager.js.map