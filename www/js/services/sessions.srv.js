angular.module('conferenceApp')
  .factory('SessionsSrv', SessionsSrv);

function SessionsSrv() {
  // Might use a resource here that returns a JSON array

  var fetchSessions = fetch("https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json")
    .then(response => {
      return response.json().then(sessions => {
        for (var id in sessions) {
          if (sessions[id].language === "fr") {
            sessions[id].language = "img/flags/fr-flag.png"
          } else if (sessions[id].language === "en") {
            sessions[id].language = "img/flags/en-flag.png"
          }
        }
        return sessions;
      })
    });

  return {
    all: function () {
      return fetchSessions;
    },
    get: function (sessionId) {
      return fetchSessions
        .then(sessions => {
          return sessions[sessionId];
        })
    },

    getSessionsForSpeakerId: function (speakerId) {
      return fetchSessions
        .then(sessions => {
          let speakerSessions = [];
          for (key in sessions) {

            if (sessions[key].speakers) {
              sessions[key].speakers.forEach(s => {
                if(s==speakerId){
                  speakerSessions.push(sessions[key]);
                }
              })
            }
          }
          return speakerSessions;
        })
    }
    // remove: function(chat) {
    //   chats.splice(chats.indexOf(chat), 1);
    // },
    // get: function(sessionId) {
    //   sessions
    //   for (var i = 0; i < chats.length; i++) {
    //     if (chats[i].id === parseInt(chatId)) {
    //       return chats[i];
    //     }
    //   }
    //   return null;
    // }
  };
};
