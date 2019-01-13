(function() {
    'use strict';
  
    angular
      .module('gladys')
      .factory('alexaService', alexaService);
  
    alexaService.$inject = ['$http', 'Notification', '$translate'];
  
    function alexaService($http, Notification, $translate) {
  
      var service = {
        saveConfig: saveConfig,
        getDeviceTypes: getDeviceTypes,
        restart: restart,
        successNotificationTranslated: successNotificationTranslated,
        errorNotificationTranslated: errorNotificationTranslated
      };
  
      return service;
  
      function saveConfig(options) {
        return $http({ method: 'PATCH', url: '/alexa/save/', data: options });
      }
  
      function getDeviceTypes() {
        return $http({ method: 'GET', url: '/alexa/device/' });
      }

      function restart() {
        return $http({ method: 'GET', url: '/alexa/restart/' });
      }

      function successNotificationTranslated(key, complement) {
        return $translate(key)
          .then(function(text) {
            if (complement) text += complement;
            Notification.success(text);
          });
      }
  
      function errorNotificationTranslated(key, complement) {
        return $translate(key)
          .then(function(text) {
            if (complement) text += complement;
            Notification.error(text);
          });
      }
    }
  })();