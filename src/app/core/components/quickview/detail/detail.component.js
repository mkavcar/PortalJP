angular
  .module('rsp.core')
  .component("rspDetail", {
    bindings: {
        item: '<'
    },
    templateUrl: 'app/core/components/quickview/detail/detail.html',
    controller: DetailController
});


function DetailController() {
    
}