// var LowerThird = require('./LowerThird');
const storage = require('node-persist');

module.exports = class LowerThirdController {
    constructor() {
        this.lowerThirds = [];
        this.loadData(); 
    }
    
    async loadData() {
        //you must first call storage.init
        await storage.init({
            dir:'storage/lowerThirds/'
        });

        var data = await storage.getItem('lowerThirds');
        if(data) {
            this.lowerThirds = data;
        } else {
            this.storeData();
        }
    }
    
    async storeData() {
        await storage.setItem('lowerThirds',this.lowerThirds);
    }

    add(element) {
        this.lowerThirds.push(element);
        this.storeData();
    }
    
    deleteByIndex(index) {
        this.lowerThirds.splice(index,1);
        this.storeData();
    }
};