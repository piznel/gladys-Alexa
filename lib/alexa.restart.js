const alexa = require('./alexa.js');
var Promise = require('bluebird');

module.exports = function restart() {
    return Promise.resolve(alexa())
}