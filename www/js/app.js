// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'myApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'myApp.services' is found in services.js
// 'myApp.controllers' is found in controllers.js
var myApp = angular.module('myApp', ['ionic' ]);

myApp.run(function($ionicPlatform, DB, Account) {
  DB.init();
  Account.init();
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

myApp.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.location', {
      url: '/location',
      views: {
        'tab-location': {
          templateUrl: 'templates/tab-location.html',
          controller: 'LocationCtrl'
        }
      }
    })

    .state('tab.stores', {
      url: '/stores',
      views: {
        'tab-stores': {
          templateUrl: 'templates/tab-stores.html',
          controller: 'StoresCtrl'
        }
      }
    })
    .state('tab.store-detail', {
      url: '/store/:storeId',
      views: {
        'tab-stores': {
          templateUrl: 'templates/store-detail.html',
          controller: 'StoreDetailCtrl'
        }
      }
    })

    .state('tab.accounts', {
      url: '/accounts',
      views: {
        'tab-accounts': {
          templateUrl: 'templates/tab-accounts.html',
          controller: 'AccountsCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/location');

});

