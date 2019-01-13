var Promise = require('bluebird');
var shared = require('./alexa.shared.js');

module.exports = function saveConfig(options) {
  shared.config = options;
  return getAlexaModule()
    .then((id) => {
      return setParam(options, id)
    })
    .then((answer) => {
      return Promise.resolve(answer)
  })
}

function setParam(options, id) {
  var param = {
    name: 'Alexa_devices',
    value: JSON.stringify(options),
    type: 'hidden',
    module: id,
    description: 'Binary\'s devices for Alexa. It is used to control it'
  }

  return gladys.param.setValue(param)
    .then(function() {
      return Promise.resolve('SAVE_SUCCESS');
    })
    .catch(e => {
      sails.log.error(`Alexa module: Binary device'\s list not saved. Error ${e}`)
      return Promise.resolve('SAVE_ERROR')
    })
}

function getAlexaModule() {
  return gladys.module.get()
    .then(modules => {
      for (let module of modules) {
        if (module.slug == 'alexa') {
          return Promise.resolve(module.id)
        }
      }
    })
}