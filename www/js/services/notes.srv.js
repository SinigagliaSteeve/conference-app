angular.module('conferenceApp')

    .factory('NotesSrv', function (uuid2) {
        // Might use a resource here that returns a JSON array
        var storedNote = localforage.createInstance({
            name: "notes"
        })

        function saveNote(note) {
            if (!note.id) {
                note.id = uuid2.newuuid();
            }

            console.log("note saved", note);

            storedNote.setItem(note.id.toString(), note);
        };

        return {
            all: function () {
                return notes;
            },

            get: function (noteId) {
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i].id === parseInt(noteId)) {
                        return notes[i];
                    }
                }
                return null;
            },

            getForSessionId: function (sessionId) {
                return storedNote.iterate((note, key) => {
                    if (note.sessionId == sessionId) {
                        return note;
                    }
                })
                    .then(note => {
                        return note;
                    })
            },

            save: function (note) {
                return saveNote(note);
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
