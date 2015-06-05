'use strict';

describe('Controller: EditArticleCtrl', function () {

  // load the controller's module
  beforeEach(module('meanBlogApp'));

  var EditArticleCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditArticleCtrl = $controller('EditArticleCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
