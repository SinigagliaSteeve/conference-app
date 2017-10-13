(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('SessionDetailCtrl', SessionDetailCtrl);

    function SessionDetailCtrl($scope, $stateParams, SessionsSrv) {
        var vm = this;

        SessionsSrv.get($stateParams.sessionId)
            .then(session => {
                vm.session = session;
            });
    }
})();