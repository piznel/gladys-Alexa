var Promise = require('bluebird');
var shared = require('./alexa.shared.js');

module.exports = function getDeviceTypes() {

  return gladys.deviceType.getByRoom()
    .then((deviceTypesRoom) => {
      return getBinaryOnly(deviceTypesRoom)
    })
    .then((deviceTypes) => {
      return removeEmptyRoom(deviceTypes)
    })
    .then((deviceTypesAlexa) => {
      return addAlexaParam(deviceTypesAlexa)
    })
}

function getBinaryOnly(deviceTypesRoom) {
  return Promise.each(deviceTypesRoom, room => {
    room.deviceTypes = room.deviceTypes.filter(deviceType => {
      return (deviceType.type === 'binary' && deviceType.sensor === 0)
    })
    return room.deviceTypes
  })
}

function removeEmptyRoom(deviceTypes) {
  return Promise.filter(deviceTypes, room => {
    return (room.deviceTypes.length > 0)
  });
}

function addAlexaParam(deviceTypesAlexa) {
  return Promise.each(deviceTypesAlexa, room => {
    delete room['house'];
    return Promise.map(room.deviceTypes, deviceType => {
      delete deviceType['type'];
      delete deviceType['deviceTypeIdentifier'];
      delete deviceType['category'];
      delete deviceType['tag'];
      delete deviceType['unit'];
      delete deviceType['min'];
      delete deviceType['max'];
      delete deviceType['display'];
      delete deviceType['sensor'];
      delete deviceType['identifier'];
      delete deviceType['device'];
      delete deviceType['service'];
      delete deviceType['lastChanged'];
      delete deviceType['lastValue'];
      delete deviceType['roomHouse'];

      deviceType.alexa = false;
      deviceType.friendlyName = '';
      deviceType.port = null;

      if (shared.config.hasOwnProperty(deviceType.id)) {
        deviceType.alexa = shared.config[deviceType.id].alexa;
        deviceType.friendlyName = shared.config[deviceType.id].friendlyName;
        deviceType.port = shared.config[deviceType.id].port;
      }
    })
  })
}