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
  // only display rooms that have devices inside
  return Promise.filter(deviceTypes, room => {
    return (room.deviceTypes.length > 0)
  });
}

function addAlexaParam(deviceTypesAlexa) {
  return Promise.each(deviceTypesAlexa, room => {
    return Promise.map(room.deviceTypes, deviceType => {
      deviceType.alexa = shared.config.hasOwnProperty(deviceType.id) ? shared.config[deviceType.id].alexa : false;
      deviceType.friendlyName = shared.config.hasOwnProperty(deviceType.id) ? shared.config[deviceType.id].friendlyName : '';
    })
  })
}