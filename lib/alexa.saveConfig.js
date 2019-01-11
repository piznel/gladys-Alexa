var Promise = require('bluebird');
const fs = require('fs');

module.exports = function saveConfig(data) {
  var ProjectRoot = process.cwd();
  fs.writeFile(ProjectRoot + '/api/hooks/alexa/config/config.json', JSON.stringify(data), function(err) {
    if (err) {
      return Promise.reject(err);
    }
    return Promise.resolve()
  });
};