var wemore = require('wemore');
var Promise = require('bluebird');
var i = 0;

module.exports = function alexa() {
  return getParam()
    .then((devices) => {
      return loadDevices(devices)
    })
    .catch(() => {
      return sails.log.error('Alexa Module : failed to load devices')
    })
}

function getParam() {
  return gladys.param.getValue('Alexa_devices')
    .then((devices) => {
      return JSON.parse(devices)
    })
    .catch(() => {
      return sails.log.error('Alexa Module : failed to load devices')
    })
}

var loadDevices = function(devices) {

  for (var device in devices) {
    var devprop = devices[device];
    if (devprop.alexa) {
      var dev = wemore.Emulate({ friendlyName: devprop.friendlyName, port: 9000 + i++ });

      dev.on('listening', (function(device, devprop) {
        return function() {}
      })(device, devprop));

      dev.on('on', (function(device, devprop) {
        var state = {
          value: 1,
          deviceType: device
        };
        return function() {
          console.log("Device", device, "recieved on");
          if (state) {
            console.log('Executing command "', state, '"');
            return gladys.deviceType.exec(state)
              .then(function(state) {
                console.log('command executed :', state)
              })
              .catch(function(err) {
                console.log(err)
              });
          }
        }
      })(device, devprop));

      dev.on('off', (function(device, devprop) {
        var state = {
          value: 0,
          deviceType: device
        };
        return function() {
          console.log("Device", device, "recieved on");
          if (state) {
            console.log('Executing command "', state, '"');
            return gladys.deviceType.exec(state)
              .then(function(state) {
                console.log('command executed :', state)
              })
              .catch(function(err) {
                console.log(err)
              });
          }
        }
      })(device, devprop));
    }
  }
};