//app.constants.js
angular
  .module('rsp.app')
  .constant("constants", {
      API_BASE_URL: "/appapi/",
      AUTH_DISABLED: false, //******** FOR LOCAL DEVELOPMENT ONLY ********
      LOG_SHIPPING_ENABLED: false,
      LOG_SHIP_INTERVAL: 10000      
  });


