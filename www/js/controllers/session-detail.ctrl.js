(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('SessionDetailCtrl', SessionDetailCtrl);

    function SessionDetailCtrl($scope, $stateParams, SessionsSrv, ScheduleSrv, SpeakersSrv) {
        var vm = this;
        vm.speakers = [];

        init();

        function init() {
            SessionsSrv.get($stateParams.sessionId)
                .then(session => {
                    vm.session = session;
                    session.speakers.forEach(speakerId => {
                        SpeakersSrv.get(speakerId).then(speaker => {
                            console.log(speaker);
                            vm.speakers.push(speaker);
                            console.log(vm.speakers);
                        })
                    })
                    return session;
                });


        }


    }
})();