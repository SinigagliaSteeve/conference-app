angular.module('conferenceApp')

    .factory('NotesSrv', function () {
        // Might use a resource here that returns a JSON array
        var notes = [{
            id: 0,
            sessionId: 0,
            comment: "Ceci est un début de note",
            pictures: [
                "../img/notes/note1.jpg",
                "../img/notes/note2.jpg",
            ]
        },
        {
            id: 1,
            sessionId: 1,
            comment: "Note id1",
            pictures: [
                "../img/notes/note3.jpg",
                "../img/notes/note4.jpg",
            ]
        }
        ];

        return {
            all: function () {
                return notes;
            },
            // get: function (sessionId) {
            //     return fetchSessions
            //         .then(sessions => {
            //             return sessions[sessionId];
            //         })
            // }

            get: function (noteId) {
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i].id === parseInt(noteId)) {
                        return notes[i];
                    }
                }
                return null;
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
