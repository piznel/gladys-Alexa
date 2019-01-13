module.exports = function(sails) {
  const alexa = require('./lib/alexa.js');
  const alexaController = require('./controller/alexaController.js')
  const install = require('./lib/alexa.install.js');

  gladys.on('ready', function() {
    alexa();
  });

  return {
    install: install,
    routes: {
      before: {
        'patch /alexa/save': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
        'get /alexa/device': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next)
      },
      after: {
        'patch /alexa/save': alexaController.saveConfig,
        'get /alexa/device': alexaController.getDeviceTypes
      }
    }
  };
};