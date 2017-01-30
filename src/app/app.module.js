'use strict';

//app.module.js
angular
  .module('rsp.app', [
    'ui.router',
    'ngAnimate',
    'ngMessages',
    'rsp.core',
    'rsp.currentOfferings'])
  .config(config)
  .run(run);

config.$inject = ['$locationProvider', '$httpProvider', '$compileProvider', '$stateProvider', '$urlRouterProvider'];

function config($locationProvider, $httpProvider, $compileProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $httpProvider.useApplyAsync(true);
  //$compileProvider.debugInfoEnabled(false);

  //$compileProvider.commentDirectivesEnabled(false);  **Not working
  //$compileProvider.cssClassDirectivesEnabled(false); **Not working

  // An array of state definitions
  var states = [{ 
      name: 'home', 
      url: '/', 
      component: 'home'  
    },{ 
      name: 'currentOfferings', 
      url: '/currentOfferings', 
      component: 'currentOfferings'
    }
  ];

  $urlRouterProvider.otherwise("/");
  
  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
}

run.$inject = ['$log', '$http', '$interval', '$rootScope', '$location'];

function run($log, $http, $interval, authService, $rootScope, $location) {
  //$rootScope.loading = true;
  //$log.startLogShipping($http, $interval);

  /*
  //init auth
  authService.init().then(function (response) {
    var user = response;

    //init all metadata
    auditService.init().then(function () {
      $rootScope.loading = false;

      if ($location.path() === "/") {
        if (user.AppSettings && user.AppSettings.defaultView)
          $rootRouter.navigate([user.AppSettings.defaultView]);
        else
          $rootRouter.navigate(['Home']);
      }

    }, function () {
      return $q.reject();
    });
  }, function (response) {
    $rootScope.loading = false;
    $rootRouter.navigate(['Splash']);
  });
  */
}