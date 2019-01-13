saveConfig = require('../lib/alexa.saveConfig.js');
getDeviceTypes = require('../lib/alexa.getDeviceTypes.js')
restart = require('../lib/alexa.restart.js')

module.exports = {

  saveConfig: function(req, res, next) {
    saveConfig(req.body)
      .then((result) => res.json(result))
      .catch(next);
  },

  getDeviceTypes: function(req, res, next) {
    getDeviceTypes()
      .then((result) => {
        res.json(result)
      })
      .catch(next);
  },

  restart: function(req, res, next) {
    restart(req.body)
      .then((result) => res.json(result))
      .catch(next)
  }
}