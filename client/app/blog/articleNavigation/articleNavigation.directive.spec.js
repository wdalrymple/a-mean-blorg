'use strict';

describe('Directive: articleNavigation', function () {

  // load the directive's module and view
  beforeEach(module('meanBlogApp'));
  beforeEach(module('app/blog/articleNavigation/articleNavigation.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<article-navigation></article-navigation>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the articleNavigation directive');
  }));
});
