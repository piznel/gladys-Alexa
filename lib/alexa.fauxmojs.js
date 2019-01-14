'use strict';
const FauxMo = require('fauxmojs');
const Promise = require('bluebird');
const shared = require('./alexa.shared.js');

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
    .catch(() => {
      return sails.log.error('Alexa Module : failed to load config')
    })
}

function loadDevices(devicesEmulated) {
  let devices = [];
  let i = 0;
  for (var device in devicesEmulated) {
    let name = devicesEmulated[device].friendlyName;
    let port = 9000 + i++;
    let id = device;

    devices.push({
      name: name,
      port: port,
      id: device,
      handler: (action) => {
        let state = {
          devicetype: parseInt(id),
          value: action === 'on' ? 1 : 0
        }
        console.log('state', state)
        return gladys.deviceType.exec(state)
          .catch(() => {
            sails.log.error('Alexa module : impossible ta change state of deviceType id = ', state.devicetype)
          });
      }
    })
  }

  let fauxMo = new FauxMo();
  fauxMo.updateDevices(devices);
}