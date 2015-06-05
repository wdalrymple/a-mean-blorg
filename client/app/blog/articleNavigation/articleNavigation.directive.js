'use strict';

angular.module('meanBlogApp')
  .directive('articleNavigation', [ '$http','$state',function ($http,$state) {
    return {
      templateUrl: 'app/blog/articleNavigation/articleNavigation.html',
      restrict: 'EA',
      scope:{
        currentdate:'@'
      },
      link: function (scope, element, attrs) {//jshint ignore:line

        scope.previousArticleEnabled=true;
        scope.nextArticleEnabled=true;

        scope.previousiArticle = function(){
          $http.get('/api/blogs/previousArticle/'+scope.currentdate+'/')
          .success(function(article) {
            if(article.length>0){
              $state.go('viewArticle', {articleId: article[0]._id }, {reload: true});
            }else{
              scope.previousArticleEnabled=false;
            }
          }).
          error(function(data, status, headers, config) {         //jshint ignore:line
            alert('There was an error in retriving the article.');//jshint ignore:line
          });
        };

        scope.nextArticle = function(){
          $http.get('/api/blogs/nextArticle/'+scope.currentdate+'/')
          .success(function(article) {
            if(article.length>0){
              $state.go('viewArticle', {articleId: article[0]._id }, {reload: true});
            }else{
              scope.nextArticleEnabled=false;
            }
          }).
          error(function(data, status, headers, config) {         //jshint ignore:line
            alert('There was an error in retriving the article.');//jshint ignore:line
          });
        };
      }
    };
  }]);
