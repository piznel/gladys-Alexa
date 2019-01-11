module.exports = function(sails) {
  const alexa = require('./lib/alexa.js');
  const alexaController = require('./controller/alexaController.js')

  gladys.on('ready', function() {
    alexa();
  });

  return {
    routes: {
      before: {
        'patch /alexa/datasave': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
        'get /alexa/device': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next)

      },
      after: {
        'patch /alexa/datasave': alexaController.saveData,
        'get /alexa/device': alexaController.getDeviceTypes
      }
    }
  };
};