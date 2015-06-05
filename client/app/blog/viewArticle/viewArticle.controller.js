'use strict';

angular.module('meanBlogApp')
  .controller('ViewArticleCtrl', function ($scope,$http,$stateParams,Auth) {
    $scope.article = {};

    $scope.enableEdit = !Auth.isAdmin();

    $http.get('/api/blogs/'+$stateParams.articleId)
    .success(function(article) {
      $scope.article = article;
      $scope.article.content = decodeURIComponent(article.content);
    }).
    error(function(data, status, headers, config) {         //jshint ignore:line
      alert('There was an error in retriving the article.');//jshint ignore:line
    });

    //add new comment
    $scope.addComment = function(articleId){
      //should I do this inline or un a modal window? bizzaro.
      $scope.article.comments.push({
        content: '',
        article: articleId,
        user: 'getuser',
        viewMode:false,
        editMode:true,
        canEditComment:true
      });
    };

  });
