(function() {
    'use strict';
  
    angular
      .module('gladys')
      .factory('alexaService', alexaService);
  
    alexaService.$inject = ['$http', 'Notification', '$translate'];
  
    function alexaService($http, Notification, $translate) {
  
      var service = {
        loadData: loadData,
        saveData: saveData,
        getDeviceTypes: getDeviceTypes,
        successNotificationTranslated: successNotificationTranslated,
        errorNotificationTranslated: errorNotificationTranslated
      };
  
      return service;
  
      function loadData() {
        return $http({ method: 'GET', url: '/alexa/dataload/' });
      }
  
      function saveData(options) {
        return $http({ method: 'PATCH', url: '/alexa/datasave/', data: options });
      }
  
      function getDeviceTypes() {
        return $http({ method: 'GET', url: '/alexa/device/' });
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