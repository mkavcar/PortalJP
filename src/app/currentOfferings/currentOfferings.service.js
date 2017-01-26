//currentOfferings.service.js
angular
  .module('rsp.currentOfferings')
  .factory('currentOfferingsApi', currentOfferingsApi);

currentOfferingsApi.$inject = ['$http'];

function currentOfferingsApi($http) {
  var currentOfferingsApi = {
    get: get
  };

  return currentOfferingsApi;

  ////////////
  function get() {
    //return $http.get(currentOfferingsConstants.API_BASE_URL + '/currentOfferings', { cache: true });
  }
};
