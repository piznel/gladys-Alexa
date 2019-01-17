const alexa_fauxmojs = require('./alexa.fauxmojs.js');
const alexa_wemore = require('./alexa.wemore.js');

module.exports = function() {
  return gladys.param.getValue('Alexa_lib')
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