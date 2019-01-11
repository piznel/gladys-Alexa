var Promise = require('bluebird');
var config = require('../config/config.json')

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
      return (deviceType.type === 'binary' && !deviceType.type.sensor)
    })
    return room.deviceTypes
  })
}

function removeEmptyRoom(deviceTypes) {
  // only display rooms that have devices inside
  return Promise.filter(deviceTypes, room => {
    console.log(room.deviceTypes.length)
    return (room.deviceTypes.length > 0)
  });
}

function addAlexaParam(deviceTypesAlexa) {
  return Promise.each(deviceTypesAlexa, room => {
    return Promise.map(room.deviceTypes, deviceType => {
      deviceType.alexa = config.hasOwnProperty(deviceType.id) ? config[deviceType.id].alexa : false,
        deviceType.friendlyName = config.hasOwnProperty(deviceType.id) ? config[deviceType.id].friendlyName : ''
    })
  })
}