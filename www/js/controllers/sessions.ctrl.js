(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('SessionsCtrl', SessionsCtrl);

    function SessionsCtrl($scope, SessionsSrv) {
        var vm = this;

        SessionsSrv.all()
            .then(sessions => {
            vm.sessions = sessions;
            console.log('sessions',sessions);
        })
    }
})();