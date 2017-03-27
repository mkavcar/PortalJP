angular
  .module('rsp.core')
  .component("rspQuickView", {
    bindings: {
        bulkItems: '<',
        detailItem: '<',
        onBulkRemove: '&'
    },
    templateUrl: 'app/core/components/quickview/quickview.html',
    controller: QuickViewController
});

QuickViewController.$inject = ['quickViewService'];

function QuickViewController(quickViewService) {
    var ctrl = this;

    ctrl.hide = hide;
    ctrl.$onInit = $onInit;
    ctrl.$onChanges = $onChanges;
    ctrl.$onDestroy = $onDestroy
    ctrl.qv = quickViewService;

    function hide() {
        quickViewService.hide();
    }

    function $onChanges() {
        if (ctrl.bulkItems.length == 0 && ctrl.detailItem == null && ctrl.qv.isOpen()) {
            hide();
        }
    }

    function $onInit() {
        quickViewService.init();
    }

    function $onDestroy() {
        console.log('qv destory');
        quickViewService.destroy();
    }
}