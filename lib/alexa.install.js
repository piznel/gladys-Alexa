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
    var param = {
      name: 'Alexa_devices',
      value: '{}',
      type: 'hidden',
      module: id,
      description: 'Binary\'s device for Alexa. It is used to control it'
    }
  
    return gladys.param.getValue(param.name)
    .then(() => {
      return gladys.utils.sql(queries.updateIdParamAlexa, [param.module])
    })
    .then((data) => {
      return data
    })
      .catch(() => {
        return gladys.param.setValue(param)
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