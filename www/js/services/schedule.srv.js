angular.module('conferenceApp')

    .factory('ScheduleSrv', ScheduleSrv);

function ScheduleSrv(SessionsSrv) {


    // Might use a resource here that returns a JSON array

    var fetchSchedule = fetch("https://raw.githubusercontent.com/DevInstitut/conference-data/master/schedule.json")
        .then(response => response.json())
        .then(schedule => {
            let sessionsFormattedPromise = [];
            
            let store = localforage.createInstance({ name: 'schedule' });
            schedule.forEach(day => {
                day.timeslots.forEach(timeslot => {
                    sessionsFormattedPromise.push(buildCompleteTimeslot(timeslot));
                });
            })
            schedule.sort((first, second) => {
                return new Date(first.date) - new Date(second.date);
            });

            schedule.forEach(day => {
                store.setItem(day.date, day);
            })

            return schedule;
        })

    function buildCompleteTimeslot(timeslot) {
        timeslot.sessions.forEach(s => {
            if (Array.isArray(s)) {
                SessionsSrv.get(s[0]).then(fetchSession => {
                    s[0] = {
                        id: fetchSession.id,
                        title: fetchSession.title,
                        track: fetchSession.track,
                        category: fetchSession.category,
                        language: fetchSession.language,
                    }
                    return s;
                })
            }
        })

        return timeslot;
    }

    return {
        all: function () {
            let sessionsFormattedPromise = [];

            return fetchSchedule;
        },

        getTimeSlotForSessionId(sessionId) {
            //todo
        }
    };
};
