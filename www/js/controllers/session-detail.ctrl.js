(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('SessionDetailCtrl', SessionDetailCtrl);

    function SessionDetailCtrl($scope, $ionicModal, $stateParams, $cordovaCamera, $cordovaFile, SessionsSrv, NotesSrv, SpeakersSrv, uuid2) {
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
                        vm.note = note ? note : { pictures: [] };
                        vm.note.sessionId = $stateParams.sessionId;
                    })
                    //get notes for this session
                    return session;
                });
        }

        vm.saveNote = function () {
            NotesSrv.save(vm.note);
        }

        vm.takePhoto = function () {
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                correctOrientation: true,                
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true
            };

            $cordovaCamera.getPicture(options).then(imageData => {
                vm.note.pictures.push(imageData);
                NotesSrv.save(vm.note).then(success => {
                    // $scope.$apply();
                })
            },
                err => {

                });
        }

        $ionicModal.fromTemplateUrl('modal.html', function (modal) {
            $scope.gridModal = modal;
        }, {
                scope: $scope,
                animation: 'slide-in-up'
            })
        $scope.openModal = function (data) {
            $scope.inspectionItem = data;
            $scope.gridModal.show();
            console.log(data);
            $scope.pictureToDisplay = data;
        }
        $scope.closeModal = function () {
            $scope.gridModal.hide();
        }


    }
})();