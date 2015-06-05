'use strict';
//filter to convert numeric month into a string
angular.module('meanBlogApp').filter('expandImageFilter',function(){
  return function(input){
    if(!input){
      return 'glyphicon glyphicon-triangle-bottom';
    }else{
      return 'glyphicon glyphicon-triangle-right';
    }
  };
});
