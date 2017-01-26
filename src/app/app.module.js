'use strict';

//app.module.js
angular
  .module('rsp.app', [
    'ngComponentRouter',
    'ngAnimate',
    'ngMessages',
    'chart.js',
    'rsp.core',
    'rsp.currentOfferings'])
  .config(config)
  .run(run)
  .value('$routerRootComponent', 'app');

config.$inject = ['$locationProvider', '$httpProvider', '$compileProvider'];

function config($locationProvider, $httpProvider, $compileProvider) {
  $locationProvider.html5Mode(true);
  $httpProvider.useApplyAsync(true);
  //$compileProvider.debugInfoEnabled(false);

  //$compileProvider.commentDirectivesEnabled(false);  **Not working
  //$compileProvider.cssClassDirectivesEnabled(false); **Not working
}

run.$inject = ['$log', '$http', '$interval', '$rootScope', '$rootRouter', '$location'];

function run($log, $http, $interval, authService, $rootScope, $rootRouter, $location) {
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