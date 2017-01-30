//header.component.js
angular
  .module('rsp.core')
  .component("rspHeader", {
    controller: HeaderController,
    templateUrl: 'app/core/components/header.html'
});

HeaderController.$inject = [];

function HeaderController() {
  var 
    ctrl = this;
  

};