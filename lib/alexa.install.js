const queries = require('./alexa.queries.js');

module.exports = function install() {
    var idModule = null;
  
    return getAlexaModule()
      .then((id) => {
        idModule = id;
        return createParam(idModule)
      })
      .catch((err) => {
        sails.log.error('Alexa module : install failed with error ', err)
        return 'success'
      })
  };
  
  function createParam(id) {
    var param_device = {
      name: 'Alexa_devices',
      value: '{}',
      type: 'hidden',
      module: id,
      description: 'Binary\'s device for Alexa. It is used to control it'
    }
  
    return gladys.param.getValue(param_device.name)
    .then(() => {
      return gladys.utils.sql(queries.updateIdParamAlexa, [param_device.module])
    })
    .then((data) => {
      return data
    })
      .catch(() => {
        return gladys.param.setValue(param_device)
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