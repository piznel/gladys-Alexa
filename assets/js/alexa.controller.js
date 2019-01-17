(function() {
  'use strict';

  angular
    .module('gladys')
    .controller('alexaCtrl', alexaCtrl);

  alexaCtrl.$inject = ['alexaService', 'paramService', '$scope'];

  function alexaCtrl(alexaService, paramService, $scope) {
    /* jshint validthis: true */
    var vm = this;

    vm.rooms = [];
    vm.remoteIsBusy = false;
    vm.ready = false;
    vm.devicetypes = [];
    vm.alexaDevices = []
    vm.libOptions = {
      library: [
        { id: 1, name: "fauxmojs" },
        { id: 2, name: "wemore" }
      ],
      selectedLibrary: {}
    };

    vm.saveConfig = saveConfig;
    vm.saveLibrary = saveLibrary;

    activate()

    function activate() {
      vm.remoteIsBusy = true;
      return alexaService.getLibrary()
        .then(function(data) {
          if (data.data === 1) {
            vm.libOptions.selectedLibrary = { id: 1, name: "fauxmojs" }
          } else {
            vm.libOptions.selectedLibrary = { id: 2, name: "wemore" }
          }
          return alexaService.getDeviceTypes()
        })
        .then(function(data) {
          vm.alexaDevices = data.data
          vm.ready = true;
          vm.remoteIsBusy = false;
          return
        })
        .catch(function(err) {
          console.log(err)
        })
    }

    function saveConfig() {
      var alexaDevice = {};

      vm.alexaDevices.forEach(function(room) {
        room.deviceTypes.forEach(function(deviceType) {
          if (deviceType.friendlyName) {
            alexaDevice[deviceType.id] = { 'alexa': deviceType.alexa, 'friendlyName': deviceType.friendlyName }
          }
        });
      });
      return alexaService.saveConfig(alexaDevice)
        .then(function(answer) {
          if (answer.status == 200) {
            if (answer.data === 'SAVE_SUCCESS') {
              alexaService.successNotificationTranslated('CONFIG_SAVE');
            } else {
              alexaService.errorNotificationTranslated('CONFIG_UNSAVE')
            }
          } else {
            alexaService.errorNotificationTranslated('CONFIG_UNSAVE')
          }
        })
    }

    function saveLibrary() {
        return paramService.update('Alexa_lib', vm.libOptions.selectedLibrary.id)
    }
  }
})();