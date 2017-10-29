// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('conferenceApp', ['ionic', 'ngCordova', 'base64', 'angularUUID2'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

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
        sessionId: 1859,
        comment: "Note id1",
        pictures: [
          "../img/notes/note3.jpg",
          "../img/notes/note4.jpg",
        ]
      }
      ];

      var storeNotes = localforage.createInstance({
        name: "notes"
      });

      //initialize some note if the database is empty (demo).
      storeNotes.length().then(size => {
        if (size === 0) {
          for (key in notes) {
            storeNotes.setItem(key, notes[key]);
          }
        }
      })
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.sessions', {
        url: '/sessions',
        views: {
          'tab-sessions': {
            templateUrl: 'templates/tab-sessions.html',
            controller: 'SessionsCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('tab.session-detail', {
        url: '/sessions/:sessionId',
        views: {
          'tab-sessions': {
            templateUrl: 'templates/session-detail.html',
            controller: 'SessionDetailCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('tab.device', {
        url: '/device',
        views: {
          'tab-device': {
            templateUrl: 'templates/tab-device.html',
            controller: 'DeviceInfoCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('tab.notes', {
        url: '/notes',
        views: {
          'tab-notes': {
            templateUrl: 'templates/tab-notes.html',
            controller: 'NotesCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('tab.note-detail', {
        url: '/notes/:noteId',
        views: {
          'tab-notes': {
            templateUrl: 'templates/note-detail.html',
            controller: 'NoteDetailCtrl',
            controllerAs: 'vm'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  });
