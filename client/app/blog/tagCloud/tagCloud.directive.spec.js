'use strict';

describe('Directive: meanBlogApp', function () {

  // load the directive's module and view
  beforeEach(module('meanBlogApp'));
  beforeEach(module('app/blog/tagCloud/tagCloud.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tag-cloud></tag-cloud>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the tagCloud directive');
  }));
});
