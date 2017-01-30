//app.component.js
angular
  .module('rsp.app')
  .component('app', {
    templateUrl: 'app/app.html',
    controller: AppController
  });

AppController.$inject = ['$rootScope', 'authService'];

function AppController($rootScope, authService) {
  var
    ctrl = this;


  $rootScope.auth = authService;
  $rootScope.isLegacyBrowser = (navigator.userAgent.indexOf('WebKit') == -1);


  ////////////
  
};
