'use strict';

describe('Controller: ArticleListCtrl', function () {

  // load the controller's module
  beforeEach(module('meanBlogApp'));

  var ArticleListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleListCtrl = $controller('ArticleListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
