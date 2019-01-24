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

    activate()

    function activate() {
      vm.remoteIsBusy = true;

      var child = document.getElementsByClassName('nav nav-tabs');
      child[0].parentNode.removeChild(child[0]);

      return alexaService.getDeviceTypes()
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
          if (deviceType.friendlyName && deviceType.friendlyName.trim().length > 0) {
            alexaDevice[deviceType.id] = {
              'alexa': deviceType.alexa,
              'friendlyName': deviceType.friendlyName.trim(),
            }
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
  }
})();