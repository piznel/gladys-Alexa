var Promise = require('bluebird');
const fs = require('fs');
const folder = './config';
const file = 'config.json'

module.exports = function loadData() {
  fs.readFile(folder + '/' + file, 'utf8', function readFileCallback(err, data) {
    if (err) {
      return Promise.reject(`${file} does not exist`);
    }
    return Promise.resolve(JSON.parse(data))
  });
}