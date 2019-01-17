var translationsEN = {
    SAVE_SETTINGS: "Save",
    HELP_ALEXA: "Help",
    SELECT_LIBRARY: "Select library to use",
    ALEXA_TEXT_1: "Only devices that can be controlled by \"On/Off\" are managed by this module.",
    ALEXA_TEXT_2: "1. Select the devices you want to drive from Alexa.",
    ALEXA_TEXT_3: "2. Give them a name that will be used as an identifier by Alexa.",
    ALEXA_TEXT_4: "3. Choice the library you want to use.",
    ALEXA_TEXT_5: "4. Save and restart Gladys.",
    ALEXA_TEXT_6: "5. From the \"Alexa\" application, search for new devices.",
    DEVICE: "Device",
    DEVICETYPE: "Devicetype",
    ALEXA_ACTIF: "Actif",
    ALEXA_NAME: "Name for Alexa",
    CONFIG_SAVE: "Successful registration!",
    CONFIG_UNSAVE: "Error when saving your settings."
  };
  
  var translationsFR = {
    SAVE_SETTINGS: "Enregistrer",
    HELP_ALEXA: "Aide",
    SELECT_LIBRARY: "Sélectionner la librairie à utiliser",
    ALEXA_TEXT_1: "Seulement les périphériques pilotables par \"On/Off\" sont gérés par ce module.",
    ALEXA_TEXT_2: "1. Sélectionnez les périphériques que vous voulez piloter depuis Alexa.",
    ALEXA_TEXT_3: "2. Donnez-leur un nom qui sera utilisé comme identifiant par Alexa.",
    ALEXA_TEXT_4: "3. Choisissez la librairie à utiliser.",
    ALEXA_TEXT_5: "4. Enregistrez et redémarrez Gladys.",
    ALEXA_TEXT_6: "5. Depuis l'application \"Alexa\", recherchez de nouveaux appareils.",
    DEVICE: "Périphérique",
    DEVICETYPE: "Fonction",
    ALEXA_ACTIF: "Actif",
    ALEXA_NAME: "Nom pour Alexa",
    CONFIG_SAVE: "Enregistrement réussi !",
    CONFIG_UNSAVE: "Erreur lors de l\'enregistrement de vos paramètres."
  };
  
  angular
    .module('gladys')
    .config(['$translateProvider', function($translateProvider) {
      // add translation table
      $translateProvider
        .translations('en', translationsEN)
        .translations('fr', translationsFR);
    }]);