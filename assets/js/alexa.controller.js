(function() {
    'use strict';
  
    angular
      .module('gladys')
      .controller('alexaCtrl', alexaCtrl);
  
    alexaCtrl.$inject = ['alexaService', '$scope'];
  
    function alexaCtrl(alexaService, $scope) {
      /* jshint validthis: true */
      var vm = this;
  
      vm.rooms = [];
      vm.remoteIsBusy = false;
      vm.ready = false;
      vm.devicetypes = [];
      vm.alexaDevices = []
  
      vm.saveConfig = saveConfig;
  
      activate()
  
      function activate() {
        vm.remoteIsBusy = true;
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
  
        vm.alexaDevices.forEach(function (room) {
            room.deviceTypes.forEach(function (deviceType) {
                if(deviceType.alexa) {
                  alexaDevice[deviceType.id] = {'alexa': deviceType.alexa, 'friendlyName': deviceType.friendlyName}
                }
            });
        });
        alexaService.saveConfig(alexaDevice)
      }
    }
  })();