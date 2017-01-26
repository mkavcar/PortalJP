//list-loading.component.js
angular
  .module('rsp.core')
  .component("rspListLoading", {
    bindings: {
        list: '<',
        filteredlist: '<',
        notFoundMessage: '@'
    },
    templateUrl: 'app/core/components/list-loading.html'
});