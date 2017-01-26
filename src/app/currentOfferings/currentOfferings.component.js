//currentOfferings.component.js
angular
  .module('rsp.currentOfferings')
  .component("currentOfferings", {
    controller: currentOfferingsController,
    templateUrl: 'app/currentOfferings/currentOfferings.html'
  });

currentOfferingsController.$inject = ['utilService', 'currentOfferingsApi'];

function currentOfferingsController(utilService, currentOfferingsApi) {
  var
    ctrl = this,
    searchState = null,
    sortState = 'name asc';

  ctrl.$routerOnActivate = $routerOnActivate;
  ctrl.search = search;
  ctrl.sort = sort;
  ctrl.sortFields = [{ value: 'name asc', name: 'Name (A-Z)' },
  { value: 'name desc', name: 'Name (Z-A)' }];


  ////////////
  function $routerOnActivate() {
    bind();
  }


  function bind() {
    ctrl.currentOfferings = null;

    //currentOfferingsApi.get().then(function (response) {
    //  ctrl.currentOfferings = utilService.filterArray(response.data.data || [], ['name', 'description'], searchState, sortState);
    //}, function () {
    //  ctrl.currentOfferings = [];
    //});
  }

  function search(search) {
    searchState = search;
    bind();
  }

  function sort(sort) {
    sortState = sort;
    bind();
  }
}