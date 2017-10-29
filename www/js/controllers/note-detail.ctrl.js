(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('NoteDetailCtrl', NoteDetailCtrl);

    function NoteDetailCtrl($scope, $stateParams, NotesSrv) {
        var vm = this;

        init();

        function init() {
            vm.note = NotesSrv.get($stateParams.noteId);
        }



    }
})();