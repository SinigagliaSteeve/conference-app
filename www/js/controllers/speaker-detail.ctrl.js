(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('SpeakerDetailCtrl', SpeakerDetailCtrl);

    function SpeakerDetailCtrl($scope, $ionicHistory, $stateParams, SpeakersSrv, SessionsSrv) {
        var vm = this;

        init();

        function init() {
            SpeakersSrv.get($stateParams.speakerId).then(speaker => {
                vm.speaker = speaker;
                SessionsSrv.getSessionsForSpeakerId($stateParams.speakerId).then(sessions => {
                    console.log(sessions);
                    vm.speaker.sessions = sessions;
                })
            })
        }

        $scope.myGoBack = function () {
            $ionicHistory.goBack();

        }

    }
})();