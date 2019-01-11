var wemore = require('wemore');
var exec = require('child_process').exec;
var fs = require('fs-extra');
var Promise = require('bluebird');
var config = require('../config/config.json')
var i = 0;

module.exports = function alexa() {
    console.log('alexa.config', config)
    return Promise.resolve(loadDevices(config))
  }

var loadDevices = function(devices) {

  for (var device in devices) {
    var devprop = devices[device];
    if(devprop.alexa) {
      var dev = wemore.Emulate({ friendlyName: devprop.friendlyName, port: 9000 + i++ });

      dev.on('listening', (function(device, devprop) {
        return function() {
        }
      })(device, devprop));

      dev.on('on', (function(device, devprop) {
        var state = {
          value:1,
          deviceType:device
        };
        return function() {
          console.log("Device", device, "recieved on");
          if (state) {
            console.log('Executing command "', state, '"');
            return gladys.deviceType.exec(state)
            .then(function(state){
               console.log('deviceState created ! ')
            })
            .catch(function(err){
              console.log(err)
            });
          }
        }
      })(device, devprop));

      dev.on('off', (function(device, devprop) {
        var state = {
          value:0,
          deviceType:device
        };
        return function() {
          console.log("Device", device, "recieved on");
          if (state) {
            console.log('Executing command "', state, '"');
            return gladys.deviceType.exec(state)
            .then(function(state){
               console.log('deviceState created ! ')
            })
            .catch(function(err){
              console.log(err)
            });
          }
        }
      })(device, devprop));
    }
  }
};