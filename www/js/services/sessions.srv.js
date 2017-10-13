angular.module('conferenceApp')

  .factory('SessionsSrv', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var fetchSessions = fetch("https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json")
      .then(response => response.json());

    return {
      all: function () {
        return fetchSessions;
      },
      get: function (sessionId) {
        return fetchSessions
          .then(sessions => {
            return sessions[sessionId];
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
  });
