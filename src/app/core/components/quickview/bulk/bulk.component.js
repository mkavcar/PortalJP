angular
  .module('rsp.core')
  .component("rspBulk", {
    bindings: {
        items: '<',
        onRemove: '&'
    },
    templateUrl: 'app/core/components/quickview/bulk/bulk.html',
    controller: BulkController
});


function BulkController() {
    
}