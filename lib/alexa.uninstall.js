module.exports = function uninstall() {

    var param = {
        name: "Alexa_devices"
      }
      return gladys.param.delete(param)
        .then(() => {
          sails.log.debug('parameter "Alexa_devices" deleted !');
        });
    }