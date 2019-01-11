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

    vm.saveData = saveData;

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

    function saveData() {
      return alexaService.saveData(vm.alexaDevices)
    }
  }
})();