//home.component.js
angular
  .module('rsp.core')
  .component("home", {
    controller: HomeController,
    templateUrl: 'app/core/components/home.html'
  });

HomeController.$inject = [];

function HomeController() {
  var ctrl = this;

  ctrl.$routerOnActivate = $routerOnActivate;

  ////////////
  function $routerOnActivate() {
    //authorize
    //authService.authorize();

    bind();

  }

  function bind() {
  
  }
};