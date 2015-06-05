'use strict';

angular.module('meanBlogApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, $modal) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    var confirmDeleteUserModal = $modal({
      title: 'Confirm Delete',
      contentTemplate: 'app/admin/deleteUser.html',
      backdrop:'static',
      controller:'AdminCtrl',
      placement:'center',
      show: false
    });
    confirmDeleteUserModal.$scope.users = $scope.users;

    //delete article method for the modal window
    confirmDeleteUserModal.$scope.deleteUser = function(user){
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.confirmDeleteUser = function(user) {
      confirmDeleteUserModal.$scope.user=user;
      confirmDeleteUserModal.$promise.then(confirmDeleteUserModal.show);
    };

    //get blog article summary from the blog api
    $http.get('/api/blogs/summary/').success(function(articles) {
      $scope.articleList = articles;
    });

    var confirmDeleteArticleModal = $modal({
      title: 'Confirm Delete',
      contentTemplate: 'app/admin/deleteArticle.html',
      backdrop:'static',
      controller:'AdminCtrl',
      placement:'center',
      show: false
    });
    confirmDeleteArticleModal.$scope.articleList = $scope.articleList;

    //delete article method for the modal window
    confirmDeleteArticleModal.$scope.deleteArticle = function(article){
      console.log('deleted article');
      $http.delete('/api/blogs/' + article._id).success(function() {
        angular.forEach($scope.articleList, function(a, i) {
          if (a === article) {
            $scope.articleList.splice(i, 1);
          }
        });
      });
    };

    $scope.confirmDeleteArticle = function(article) {
      confirmDeleteArticleModal.$scope.article=article;
      confirmDeleteArticleModal.$promise.then(confirmDeleteArticleModal.show);
    };


  });
