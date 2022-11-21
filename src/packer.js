const fs = require('fs');
const utils = require('./utils');

class Packer {

    constructor() {
        this.MAX_WEIGHT = 100;
        this.MAX_COUNT = 15;
    }

    getInputPath = (fileName) => {
        return fileName || 'skeleton_javascript/resources/example_input';
    }
    
    readInput = (inputPath) => {
        try {
            const inputData = fs.readFileSync(inputPath, 'utf-8');
            return inputData;
        }
        catch (e) {
            throw new Error('Unable to read file');
        }
    }
    
    normaliseItems = (items) => {
        return items.map(item => (
            {
                'index': this.getIndex(item),
                'weight': this.getWeight(item),
                'price': this.getPrice(item)
            }
        ));
    }
    
    getPrice = (item) => {
        return parseInt(item.match(/\d+(?=\)$)/g)[0]);
    }
    
    getWeight = (item) => {
        return parseFloat(item.match(/(?<=,)\d*\.?\d*(?=,)/g)[0]);
    }
    
    getIndex = (item) => {
        return item.match(/(?<=\()\d*(?=,)/g)[0];
    }
    
    sortByPrice = (items) => {
        const normalisedItems = this.normaliseItems(items);
    
        const compareValue = (a, b) => {
            return b.price - a.price;
        };
    
        normalisedItems.sort(compareValue);
    
        return normalisedItems;
    }

    pack = (sortedItems, weightLimit) => {

        let packedItems = [];
        let availableWeight = weightLimit > this.MAX_WEIGHT ? this.MAX_WEIGHT : weightLimit;

        for (const item of sortedItems) {
            if (item.weight < availableWeight && packedItems.length < this.MAX_COUNT) {
                packedItems.push(item);
                availableWeight = availableWeight - item.weight;

                utils.appLog('added item no ' + item.index + ', weight ' + item.weight);
            }
        }
        
        return packedItems;
    }
}

module.exports = new Packer;