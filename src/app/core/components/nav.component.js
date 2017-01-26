//nav.component.js
angular
  .module('rsp.core')
  .component("rspNav", {
    controller: NavController,
    templateUrl: 'app/core/components/nav.html'
});

NavController.$inject = ['$rootRouter'];

function NavController($rootRouter) {
  var 
    ctrl = this;
    ctrl.navigate = navigate;

  
  ////////////
  function navigate(component) {
    $rootRouter.navigate([component]);
  }

};