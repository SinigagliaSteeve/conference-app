(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('SpeakersCtrl', SpeakersCtrl);

    function SpeakersCtrl($scope, $stateParams, SpeakersSrv) {
        var vm = this;
        vm.speakers = [];

        init();
        console.log("coucou");
        function init() {
            SpeakersSrv.all().then(speakers => {
                vm.speakers = [];
                for (let key in speakers) {
                    vm.speakers.push(speakers[key]);
                };


                vm.speakers.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                });
                $scope.$apply();
            });
            // vm.note = NotesSrv.get($stateParams.noteId);
        }



    }
})();