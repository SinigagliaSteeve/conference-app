angular.module('conferenceApp')
    .factory('SpeakersSrv', SpeakersSrv);

function SpeakersSrv() {
    // Might use a resource here that returns a JSON array

    var fetchSpeakers = fetch("https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json")
        .then(response => {
            return response.json().then(speakers => {
                //   for (var id in speakers) {
                //   }
                return speakers;
            })
        });

    return {
        all: function () {
            return fetchSpeakers;
        },
        get: function (speakerId) {
            return fetchSpeakers
                .then(speakers => {
                    return speakers[speakerId];
                })
        }
    };
};
