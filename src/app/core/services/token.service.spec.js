describe('tokenService', function() {
  var tokenServiceObj;
  
  //load module
  beforeEach(function() {
    module('rsp.core');
  });
  
  //set up mock service object
  beforeEach(inject(function(tokenService) {
    tokenServiceObj = tokenService;
  }))

  it('should define methods', function() {
    expect(tokenServiceObj.getToken).toBeDefined()
    expect(tokenServiceObj.getToken).toEqual(jasmine.any(Function))
  });
});