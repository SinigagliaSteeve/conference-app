(function () {
    'use strict';

    angular.module('conferenceApp')
        .controller('SessionDetailCtrl', SessionDetailCtrl);

    function SessionDetailCtrl($scope, $state, $ionicHistory, $ionicModal, $stateParams, $cordovaCamera, $cordovaImagePicker, $cordovaCapture, $cordovaFile, SessionsSrv, NotesSrv, SpeakersSrv, $ionicPopup) {
        var vm = this;
        vm.speakers = [];
        vm.note = {};
        vm.formModified = false;

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
                        vm.note = note ? note : {
                            pictures: [],
                            voices: [],
                            videos: []
                        };
                        vm.note.sessionId = $stateParams.sessionId;
                    })
                    //get notes for this session
                    return session;
                });
        }

        $scope.myGoBack = function () {
            $ionicHistory.goBack();

        }

        vm.navigateToSpeaker = function (speakerId) {
            $state.go('tab.speaker-detail',{'speakerId':speakerId});
        }
        $scope.$watch('vm.note.comment', (newVal, oldVal) => {
            if (newVal !== oldVal && oldVal != undefined) {
                vm.formModified = true;
            } else {
                vm.formModified = false;
            }
        })

        vm.saveNote = function () {
            NotesSrv.save(vm.note);
        }

        vm.captureAudio = function () {
            let options = {
                limit: 1
            }
            $cordovaCapture.captureAudio(options)
                .then(audioData => {
                    vm.note.voices.push(audioData);
                });
        }

        vm.takeVideo = function () {
            let options = {
                limit: 1
            }

            // navigator.mediaDevices.capture.captureVideo(onSuccess, onError, options);

            // function onSuccess(mediaFiles) {
            //     mediaFiles.forEach(media => {
            //         vm.note.videos.push(media.fullPath);
            //     })
            // }
            $cordovaCapture.captureVideo(options).then(function (videoData) {
                videoData.forEach(v => {
                    vm.note.videos.push(v.fullPath);
                })
                NotesSrv.save(vm.note);

                // NotesSrv.save(vm.note);
            })
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

        vm.selectPictures = function () {
            let options = {
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: Camera.DestinationType.FILE_URI,
                quality: 100,
                encodingType: Camera.EncodingType.JPEG,
                correctOrientation: true
            };

            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        vm.note.pictures.push(results[i]); //todo copy to local storage app ?
                    }
                    NotesSrv.save(vm.note);
                }, function (error) {
                    // error getting photos
                });
        }

        $ionicModal.fromTemplateUrl('modal.html', function (modal) {
            $scope.gridModal = modal;
        },
            {
                scope: $scope,
                animation: 'slide-in-up'
            });

        $ionicModal.fromTemplateUrl('modalVideo.html', function (modal) {
            $scope.videoModal = modal;
        },
            {
                scope: $scope,
                animation: 'slide-in-up'
            });



        $scope.openModal = function (data) {
            $scope.inspectionItem = data;
            $scope.gridModal.show();
            $scope.pictureToDisplay = data;
        }

        $scope.openModal = function (data) {
            $scope.inspectionItem = data;
            $scope.videoModal.show();
            $scope.videoToDisplay = data;
        }


        $scope.closeModal = function () {
            $scope.videoModal.hide();
        }

        $scope.closeModal = function () {
            $scope.gridModal.hide();
        }


    }
})();