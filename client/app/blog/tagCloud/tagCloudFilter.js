'use strict';
//filter to convert numeric month into a string
angular.module('meanBlogApp').filter('tagCloudFilter',function(){
  return function(input){
    var weight = Number(input);
    if(weight>30){
      return 'btn-lg';
    }else if(weight <20 && weight >10){
      return '';
    }else if(weight <10 && weight > 5){
      return 'btn-sm';
    }else if(weight <5){
      return 'btn-xs';
    }
  };
});
