'use strict';
//filter to convert numeric month into a string
angular.module('meanBlogApp').filter('diableArticleNavigationButton',function(){
  return function(input){
    if(!input){
      return 'disabled';
    }else{
      return '';
    }
  };
});
