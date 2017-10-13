(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('SessionsCtrl', SessionsCtrl);

    function SessionsCtrl($scope, SessionsSrv) {
        var vm = this;

        init();

        function init() {
            SessionsSrv.all()
                .then(sessions => {
                    $scope.$apply(() => {
                        vm.sessions = sessions;
                    });
                });
        }



    }
})();