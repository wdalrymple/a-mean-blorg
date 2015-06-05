'use strict';

angular.module('meanBlogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('viewArticle', {
        url: '/viewArticle/:articleId',
        templateUrl: 'app/blog/viewArticle/viewArticle.html',
        controller: 'ViewArticleCtrl',
        params:{
          articleId:{value:null,squash:false}
        }
      })
      .state('editArticle', {
        url: '/editArticle/:articleId',
        templateUrl: 'app/blog/editArticle/editArticle.html',
        controller: 'EditArticleCtrl',
        authenticate: true,
        params:{
          articleId:{value:null,squash:true}
        }
      })
      .state('articleList', {
        url: '/articleList/:year/:month/?tag',
        templateUrl: 'app/blog/articleList/articleList.html',
        controller: 'ArticleListCtrl',
        params:{
          year:{value:null,squash:true},
          month:{value:null,squash:true},
          tag:{value:null,squash:true}
        }
      })
      .state('blog', {
        url: '/',
        templateUrl: 'app/blog/blog.html',
        controller: 'BlogCtrl'
      });
  });
