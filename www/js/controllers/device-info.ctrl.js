(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('DeviceInfoCtrl', DeviceInfoCtrl);

    function DeviceInfoCtrl($scope, $cordovaDevice, $ionicPlatform, $cordovaNetwork) {
        var vm = this;

        $ionicPlatform.ready(function () {
            vm.device = $cordovaDevice.getDevice();
            vm.network = $cordovaNetwork.getNetwork()
        });
    }
})();