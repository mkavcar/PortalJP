//nav.component.js
angular
  .module('rsp.core')
  .component("rspNav", {
    controller: NavController,
    templateUrl: 'app/core/components/nav.html'
});

NavController.$inject = [];

function NavController() {
  var 
    ctrl = this;

};