saveData = require('../lib/alexa.saveData.js');
getDeviceTypes = require('../lib/alexa.getDeviceTypes.js')


module.exports = {

  saveData: function(req, res, next) {
    saveData(req.body)
      .then((result) => res.json(result))
      .catch(next);
  },

  getDeviceTypes: function(req, res, next) {
    getDeviceTypes()
      .then((result) => {
        res.json(result)
      })
      .catch(next);
  }
}