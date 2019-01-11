var Promise = require('bluebird');
var loadData = require('./alexa.loadData.js');
var alexaData = '';

module.exports = function getDeviceTypes() {

    return gladys.deviceType.getByRoom()
    .then((data) => {
      return getBinary(data.data)
    })  
    
    .then((deviceTypes) => {
        return addAlexa(deviceTypes)
    })    
}

function getBinary(deviceTypesRoom) {
    return Promise.each(deviceTypesRoom, room => {
        return Promise.filter(room, deviceType => {
            return deviceType.type === 'binary' && !deviceType.sensor
        })
    })
}

function addAlexa(deviceTypesRoom) {
  return loadData()
    .then((data) => {
        return Promise.each(deviceTypesRoom, room => {
            return Promise.map(room, deviceType => {
                deviceType.accessAlexa = data.hasOwnProperty(deviceType.id) ? alexaData[deviceType.id].accessAlexa : false,
                deviceType.nameAlexa = data.hasOwnProperty(deviceType.id) ? alexaData[deviceType.id].nameAlexa : ''
            })
        })
      
    })
}