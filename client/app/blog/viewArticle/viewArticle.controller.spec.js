'use strict';

describe('Controller: ViewArticleCtrl', function () {

  // load the controller's module
  beforeEach(module('meanBlogApp'));

  var ViewArticleCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewArticleCtrl = $controller('ViewArticleCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
