var wemore = require('wemore');
var Promise = require('bluebird');
var shared = require('./alexa.shared.js');
var i = 0;

module.exports = function alexa() {
  return getParam()
    .then((devices) => {
      return Promise.resolve(loadDevices(devices))
    })
    .catch((err) => {
      return sails.log.error('Alexa Module : failed to load devices', err)
    })
}

function getParam() {
  return gladys.param.getValue('Alexa_devices')
    .then((devices) => {
      shared.config = JSON.parse(devices)
      return Promise.resolve(shared.config)
    })
    .catch((err) => {
      return sails.log.error('Alexa Module : failed to load config')
    })
}

function loadDevices(devices) {

  for (var device in devices) {
    var devprop = devices[device];
    if (devprop.alexa) {
      var dev = wemore.Emulate({ friendlyName: devprop.friendlyName, port: 9000 + i++ });

      dev.on('listening', (function(device, devprop) {
        return function() {}
      })(device, devprop));

      dev.on('on', (function(device, devprop) {
        var state = {
          devicetype: parseInt(device),
          value: 1
        };
        return function() {
          if (state) {
            return gladys.deviceType.exec(state)
              .catch(function(err) {
                console.log(err)
              });
          }
        }
      })(device, devprop));

      dev.on('off', (function(device, devprop) {
        var state = {
          devicetype: parseInt(device),
          value: 0
        };
        return function() {
          if (state) {
            return gladys.deviceType.exec(state)
              .catch(function(err) {
                console.log(err)
              });
          }
        }
      })(device, devprop));
    }
  }
};