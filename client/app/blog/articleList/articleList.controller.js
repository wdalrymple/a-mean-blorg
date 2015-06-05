'use strict';

angular.module('meanBlogApp')
  .controller('ArticleListCtrl', function ($scope,$http,$stateParams) {

    $scope.articleList = [];

    $scope.init= function(){
      if($stateParams.tag===null){
        $http.get('/api/blogs/summary/'+ ( $stateParams.year !==null ? $stateParams.year + ( $stateParams.month !== null? '/'+$stateParams.month+'/' : '/' ) :'' ) ).success(function(articles) {
          $scope.articleList = articles;
          for(var i=0;i<articles.length;i++){
            articles[i].content = decodeURIComponent(articles[i].content);
            articles[i].synopsis = decodeURIComponent(articles[i].synopsis);
          }
        });
      }else{
        $http.get('/api/blogs/tag/'+ $stateParams.tag +'/').success(function(articles) {
          $scope.articleList = articles;
          for(var i=0;i<articles.length;i++){
            articles[i].content = decodeURIComponent(articles[i].content);
            articles[i].synopsis = decodeURIComponent(articles[i].synopsis);
          }
        });
      }
    };

    $scope.init();

  });
