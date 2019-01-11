loadData = require('../lib/alexa.loadData.js');
saveData = require('../lib/alexa.saveData.js');
getDeviceTypes = require('../lib/alexa.getDeviceTypes.js')


module.exports = {

  loadData: function(req, res, next) {
    loadData()
      .then((result) => {
        res.json(result)
      })
      .catch(next);
  },

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
