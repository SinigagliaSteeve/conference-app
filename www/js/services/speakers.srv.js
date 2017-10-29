angular.module('conferenceApp')
    .factory('SpeakersSrv', SpeakersSrv);

function SpeakersSrv() {
    // Might use a resource here that returns a JSON array

    var fetchSpeakers = fetch("https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json")
        .then(response => {
            return response.json().then(speakers => {
                for (var id in speakers) {
                    speakers[id].photoUrl = "https://devfest.gdgnantes.com/" + speakers[id].photoUrl;
                    speakers[id].socials = speakers[id].socials.map(social => {
                        social.icon = "img/socials/" + social.icon+".png";
                        return social;
                    })
                }
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
