var Promise = require('bluebird');
const fs = require('fs');
const folder = './config';
const file = 'config.json'

module.exports = function saveData(data) {
  fs.writeFile(folder + '/' + file, data, function(err) {
    if (err) {
      return Promise.reject(err);
    }
    return Promise.resolve()
  });

};