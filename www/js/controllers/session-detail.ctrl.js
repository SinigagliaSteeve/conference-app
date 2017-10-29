(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('SessionDetailCtrl', SessionDetailCtrl);

    function SessionDetailCtrl($scope, $stateParams, SessionsSrv, NotesSrv, SpeakersSrv) {
        var vm = this;
        vm.speakers = [];
        vm.note = {};

        init();

        function init() {
            //get session
            SessionsSrv.get($stateParams.sessionId)
                .then(session => {
                    vm.session = session;
                    //get all speakers for this session
                    session.speakers.forEach(speakerId => {
                        SpeakersSrv.get(speakerId).then(speaker => {
                            vm.speakers.push(speaker);
                        })
                    })

                    NotesSrv.getForSessionId($stateParams.sessionId).then(note => {
                            vm.note = note ? note : {};
                            vm.note.sessionId = $stateParams.sessionId;
                    })
                    //get notes for this session
                    return session;
                });
        }

        vm.saveNote = function () {
            NotesSrv.save(vm.note);
        }


    }
})();