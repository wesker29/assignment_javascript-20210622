const utils = {}

utils.appLog = (message) => {
    if (process.argv[3]) {
        console.info(message);
    }
} 

module.exports = utils;