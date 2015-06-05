'use strict';

describe('Directive: editComment', function () {

  // load the directive's module and view
  beforeEach(module('meanBlogApp'));
  beforeEach(module('app/blog/editComment/editComment.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<edit-comment></edit-comment>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the editComment directive');
  }));
});
