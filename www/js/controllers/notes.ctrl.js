(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('NotesCtrl', NotesCtrl);

    function NotesCtrl($scope, NotesSrv) {
        var vm = this;

        init();

        function init() {
            vm.notes = NotesSrv.all();
            // NotesSrv.all()
            //     .then(notes => {
            //         $scope.$apply(() => {
            //             vm.notes = notes;
            //         });
            //     });
        }



    }
})();