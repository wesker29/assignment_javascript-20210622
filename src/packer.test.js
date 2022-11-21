const packer = require('./packer');
const fs = require('fs');
jest.mock('fs');

test('default input path if none provided', () => {
    expect(packer.getInputPath()).toBe('skeleton_javascript/resources/example_input');
});

test('return the input path as provided', () => {
    expect(packer.getInputPath('test.txt')).toBe('test.txt');
});

test('read file content as input for this test', () => {
    fs.readFileSync.mockReturnValue('stuff');
    expect(packer.readInput(packer.getInputPath())).toBe('stuff');
});

test('convert array with string to an array with object', () => {
    const items = ['(1,90.73,€13)', '(2,33,€40)'];

    const newItems = packer.normaliseItems(items);

    const expectedObj = [
        {
            'index': '1',
            'weight': 90.73,
            'price': 13
        },
        {
            'index': '2',
            'weight': 33,
            'price': 40
        }
    ];

    expect(newItems).toStrictEqual(expectedObj);
});

test('get the price value from item string', () => {
    const item = '(1,90.73,€13)';

    expect(packer.getPrice(item)).toBe(13);
});

test('get the price value from item string - without currency', () => {
    const item = '(1,90.73,13)';

    expect(packer.getPrice(item)).toBe(13);
});

test('get the weight as float type', () => {
    const item = '(1,90.73,13)';

    expect(packer.getWeight(item)).toBe(90.73);
});

test('get the item index as string', () => {
    const item = '(1,90.73,13)';

    expect(packer.getIndex(item)).toBe('1');
});

test('sort list of items by price in an object format', () => {
    const items = ['(1,90.73,€13)', '(2,33,€40)', '(4,33,€50)', '(3,33,€56)'];

    const newItems = packer.sortByPrice(items);

    const expectedObj = [        
        {
            'index': '3',
            'weight': 33,
            'price': 56
        },
        {
            'index': '4',
            'weight': 33,
            'price': 50
        },
        {
            'index': '2',
            'weight': 33,
            'price': 40
        },
        {
            'index': '1',
            'weight': 90.73,
            'price': 13
        }
    ];

    expect(newItems).toStrictEqual(expectedObj);
});

test('returned packed items if its less than the weight limit and within max count', ()=> {
    const items = [        
        {
            'index': '3',
            'weight': 33,
            'price': 56
        },
        {
            'index': '4',
            'weight': 33,
            'price': 50
        },
        {
            'index': '2',
            'weight': 33,
            'price': 40
        },
        {
            'index': '1',
            'weight': 1,
            'price': 13
        }
    ];

    const expectedObj = [        
        {
            'index': '3',
            'weight': 33,
            'price': 56
        },
        {
            'index': '4',
            'weight': 33,
            'price': 50
        },
        {
            'index': '1',
            'weight': 1,
            'price': 13
        }
    ];

    expect(packer.pack(items, 68)).toStrictEqual(expectedObj);
});

