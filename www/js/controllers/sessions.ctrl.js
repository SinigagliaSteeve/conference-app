(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('SessionsCtrl', SessionsCtrl);

    function SessionsCtrl($scope, SessionsSrv, ScheduleSrv) {
        var vm = this;

        init();

        function init() {
            ScheduleSrv.all()
                .then(schedule => {
                    console.log("schedule",schedule)
                    vm.schedule = schedule;
                })
        }


    }
})();