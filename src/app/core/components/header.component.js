//header.component.js
angular
  .module('rsp.core')
  .component("rspHeader", {
    controller: HeaderController,
    templateUrl: 'app/core/components/header.html'
});

HeaderController.$inject = ['$rootRouter'];

function HeaderController($rootRouter) {
  var 
    ctrl = this;
    ctrl.navigate = navigate;

  
  ////////////
  function navigate(component) {
    $rootRouter.navigate([component]);
  }

};