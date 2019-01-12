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
      .then((result) => {
        // if it exists, we return it
        return result;
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