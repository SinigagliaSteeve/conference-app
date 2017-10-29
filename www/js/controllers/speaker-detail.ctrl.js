(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('SpeakerDetailCtrl', SpeakerDetailCtrl);

    function SpeakerDetailCtrl($scope, $cordovaContacts, $ionicHistory, $stateParams, SpeakersSrv, SessionsSrv) {
        var vm = this;
        var speakerContact = {};

        init();

        function init() {
            SpeakersSrv.get($stateParams.speakerId).then(speaker => {
                vm.speaker = speaker;
                SessionsSrv.getSessionsForSpeakerId($stateParams.speakerId).then(sessions => {
                    vm.speaker.sessions = sessions;
                    speakerContact = findContact();
                })
            })
        }

        $scope.myGoBack = function () {
            $ionicHistory.goBack();

        }

        function findContact() {
            var options = new ContactFindOptions();
            options.filter = vm.speaker.name;
            options.multiple = true;
            var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
            return navigator.contacts.find(fields, contacts => {
                if (contacts.length > 0) {
                    vm.savedContact = true;
                    return contacts[0];
                }
                return null;
            }, contactError => {
                alert("Erreur durant la vérification du contact");
            }, options);
        }

        vm.manageContact = function () {
            if (vm.savedContact) {
                let contact = navigator.contacts.create();
                contact.displayName = vm.speaker.name;
                contact.name = vm.speaker.name;
                contact.nickName = vm.speaker.name;

                $cordovaContacts.save(contact).then(result => {
                    speakerContact = result;
                    alert("Le contact a été sauvegardé");
                }, error => {
                    console.log(error);
                })
            } else {
                speakerContact.remove(() => {
                    alert('Contact supprimé');
                }, contactError => {
                    alert("Le contact n\'a pas pu être supprimé : " + contactError);
                })
            }
        }
    };


})();