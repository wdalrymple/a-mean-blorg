'use strict';

angular.module('meanBlogApp')
  .controller('EditArticleCtrl', function ($scope,$http,$state,$stateParams,$modal) {

    var statusModal = $modal({
      title: 'Status',
      contentTemplate: 'app/blog/editArticle/statusModal.html',
      backdrop:'static',
      controller:'EditArticleCtrl',
      placement:'center',
      show: false
    });

    $scope.showStatusModal = function(title, message) {
      statusModal.$scope.title=title;
      statusModal.$scope.message=message;
      statusModal.$promise.then(statusModal.show);
    };

    $scope.init = function(){
      //if articlId =! null then preset scope article else go get and set it
      if($stateParams.articleId===null){
        $scope.article = {
          title:'',
          synopsis:'',
          content:'Article Content\r\n---------------\r\nThis page lets you create HTML by entering text in a simple format that\'s easy to read and write.\r\n- Type Markdown text in the left window\r\n- See the HTML in the right\r\nMarkdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site] [1]:\r\n> The overriding design goal for Markdown\'s\r\n> formatting syntax is to make it as readable\r\n> as possible. The idea is that a\r\n> Markdown-formatted document should be\r\n> publishable as-is, as plain text, without\r\n> looking like it\'s been marked up with tags\r\n> or formatting instructions.',
          tags:[]
        };
      }else{
        $http.get('/api/blogs/'+$stateParams.articleId)
        .success(function(article) {
          $scope.article = article;
          $scope.article.content = decodeURIComponent(article.content);
          $scope.article.synopsis = decodeURIComponent(article.synopsis);
        }).
        error(function(data, status, headers, config) {         //jshint ignore:line
          $scope.article = {
            title:'',
            synopsis:'',
            content:'Article Content\r\n---------------\r\nThis page lets you create HTML by entering text in a simple format that\'s easy to read and write.\r\n- Type Markdown text in the left window\r\n- See the HTML in the right\r\nMarkdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site] [1]:\r\n> The overriding design goal for Markdown\'s\r\n> formatting syntax is to make it as readable\r\n> as possible. The idea is that a\r\n> Markdown-formatted document should be\r\n> publishable as-is, as plain text, without\r\n> looking like it\'s been marked up with tags\r\n> or formatting instructions.',
            tags:[]
          };
        });
      }

    };

    $scope.save = function(article){
      var articleToUpdate= {
        title: article.title,
        content: encodeURIComponent(article.content),
        tags: article.tags,
        synopsis: encodeURIComponent(article.synopsis)
      };

      if($stateParams.articleId!==null){
        $http.put('/api/blogs/'+$stateParams.articleId,articleToUpdate).
          success(function(data, status, headers, config) {//jshint ignore:line
            $scope.showStatusModal('Succcess!','Successfully save the article.');
            $state.go('blog', {}, {reload: true});
          }).
          error(function(data, status, headers, config) {//jshint ignore:line
            $scope.showStatusModal('Error!','There was an error in saving the article.');
        });
      }else{
        $http.post('/api/blogs',articleToUpdate).
          success(function(data, status, headers, config) {//jshint ignore:line
            //alert('Successfully save the article.'); //jshint ignore:line
            $scope.showStatusModal('Succcess!','Successfully save the article.');
            $state.go('blog', {}, {reload: true});
          }).
          error(function(data, status, headers, config) {//jshint ignore:line
            $scope.showStatusModal('Error!','There was an error in saving the article.');
        });
      }


    };

    $scope.cancel = function(){
      if (confirm('Are you sure that you want to discard any changes made?') === true) { //jshint ignore:line
        $state.go('blog', {}, {reload: true});
      }
    };

    $scope.addTag = function(tag){
      for(var i =0;i<$scope.article.tags.length;i++){
        if($scope.article.tags[i]===tag){
          //alert('Cannot add a duplicate tag \'' +tag+'\'.'); //jshint ignore:line
          $scope.showStatusModal('Error!','Cannot add a duplicate tag \'' +tag+'\'.');
          $scope.tag='';
          return;
        }
      }
      $scope.article.tags.push(tag);
      $scope.tag='';
    };

    $scope.deleteTag = function(tag){
      for(var i =0;i<$scope.article.tags.length;i++){
        if($scope.article.tags[i]===tag){
          $scope.article.tags.splice(i,1);
        }
      }
    };

    $scope.init();
    // encodeURIComponent(uri)
  });
