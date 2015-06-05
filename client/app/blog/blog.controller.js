'use strict';

angular.module('meanBlogApp')
  .controller('BlogCtrl', function ($scope,$http) {

    $scope.articleList = [];

    $http.get('/api/blogs/summary/').success(function(articles) {
      $scope.articleList = articles;
      for(var i=0;i<articles.length;i++){
        articles[i].content = decodeURIComponent(articles[i].content);
        articles[i].synopsis = decodeURIComponent(articles[i].synopsis);
      }
    });

  });
