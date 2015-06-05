'use strict';

angular.module('meanBlogApp')
  .directive('tagCloud', function ($http) {
    return {
      templateUrl: 'app/blog/tagCloud/tagCloud.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

        $http.get('/api/blogs/tagCloud/').success(function(result) {
          //add link urls to the result
          //for(var i=0;i<result.tags.length;i++){
          //    result.tags[i].link="/blog/articleList/?tag="+result.tags[i].text;
          //}
          scope.tagList = result.tags;
        });

      }
    };
  });
