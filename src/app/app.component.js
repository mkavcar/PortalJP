//app.component.js
angular
  .module('rsp.app')
  .component('app', {
    templateUrl: 'app/app.html',
    controller: AppController,
    $routeConfig: [
      { path: '/', name: 'Home', component: 'home', useAsDefault: true },
      { path: '/currentOfferings', name: 'CurrentOfferings', component: 'currentOfferings' }
    ]
  });

AppController.$inject = ['$rootScope', '$rootRouter', 'authService'];

function AppController($rootScope, $rootRouter, authService) {
  var
    ctrl = this;

  ctrl.navigate = navigate;

  $rootScope.auth = authService;
  $rootScope.isLegacyBrowser = (navigator.userAgent.indexOf('WebKit') == -1);


  ////////////
  function navigate(comp) {
    ctrl.$rootRouter.navigate([comp]);
  }
};
