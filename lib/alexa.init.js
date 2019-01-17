const alexa_fauxmojs = require('./lib/alexa.fauxmojs.js');
const alexa_wemore = require('./lib/alexa.wemore.js');

module.exports = function() {
  return gladys.param.getValue(param_lib.name)
    .then((lib) => {
      if (lib === 1) {
        return alexa_fauxmojs()
      } else {
        return alexa_wemore()
      }
    })
    .catch(() => {
      sails.log.error('Alexa module : unknown library')
    })
}