'use strict';

angular.module('meanBlogApp')
  .directive('editComment', function () {
    return {
      templateUrl: 'app/blog/editComment/editComment.html',
      restrict: 'EA',
      scope:{
        articleId:'@',
        comment:'=',
        viewMode:'=',
        editMode:'=',
        canEditComment:'='
      },
      link: function (scope, element, attrs) {//jshint ignore:line
          scope.cancel = function(){

            //need to figure out pub sub at this point. i should bubble up a save or cancel event on the
            //comment which should trigger the parent to update, not the child

            //or replace this with a modal popup? 

            scope.comment.viewMode=true;
            scope.comment.editMode=false;
            console.log('disable the edit');
            console.log(scope.comment);
          };
      }
    };
});
