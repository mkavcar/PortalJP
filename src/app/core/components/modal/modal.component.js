//header.component.js
angular
  .module('rsp.core')
  .component("rModal", {
    controller: ModalController,
    templateUrl: 'app/core/components/modal/modal.html',
    transclude: true,
    bindings: {
        id: '@'
    }
});

ModalController.$inject = ['modalService'];

function ModalController(modalService) {
    var ctrl = this;
  
    ctrl.close = close;

    function close() {
        modalService.close(ctrl.id);
    }
};