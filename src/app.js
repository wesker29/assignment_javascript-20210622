const fileName = process.argv[2];

const fs = require('fs');
const readline = require('readline');
const utils = require('./utils');
const packer = require('./packer');

const inputPath = packer.getInputPath(fileName);

utils.appLog('input path ' + inputPath);

const input = packer.readInput(inputPath);

input.split(/\r?\n/).forEach(line => {
    const weightLimit = line.match(/^\d+/)[0];
    const items = line.match(/\(\d+,\d*\.?\d*,.\d+\)/g);

    utils.appLog('weight limit ' + weightLimit);
    utils.appLog('no of items ' + items.length);

    const sorted = packer.sortByPrice(items);

    const packedItems = packer.pack(sorted, weightLimit);

    utils.appLog(packedItems);

    if (packedItems.length === 0) {
        console.info('-');
    }
    else {
        console.info(packedItems.map(({index}) => index).join(', '));
    }
});

