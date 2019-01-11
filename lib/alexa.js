var wemore = require('wemore');
var exec = require('child_process').exec;
var fs = require('fs-extra');
var Promise = require('bluebird');
const folder = './config';
const file = 'config.json'

var loadDevices = function(devices) {

  for (var device in devices) {
    var dev = wemore.Emulate({ friendlyName: device.nameAlexa, port: 9000 + i++ });
    var devprop = devices[device];

    dev.on('listening', (function(device, devprop) {
      return function() {
        console.log(device + " Now online, Now listening on", this.port);
      }
    })(device, devprop));

    dev.on('on', (function(device, devprop) {
      var command = devprop.oncommand;
      return function() {
        console.log("Device", device, "recieved on");
        if (command) {
          console.log('Executing command "', command, '"');
          exec(command, function(error, stdout, stderr) {
            //console.log( arguments );
          });
        }
      }
    })(device, devprop));

    dev.on('off', (function(device, devprop) {
      var command = devprop.offcommand;
      return function() {
        console.log("Device", device, "recieved off");
        if (command) {
          console.log('Executing command "', command, '"');
          exec(command, function(error, stdout, stderr) {
            //console.log( arguments );
          });
        }
      }
    })(device, devprop));
  }

};

fs.readFile(folder + '/' + file, 'utf8', function readFileCallback(err, data) {
  if (err) {
    return Promise.reject(`${file} does not exist`);
  } else {
    return Promise.resolve(loadDevices(deviceFile))
  }
});