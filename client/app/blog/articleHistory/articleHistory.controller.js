'use strict';

angular.module('meanBlogApp')
  .controller('articleHistoryCtrl', function ($scope,$http) {

    $scope.years = [];

    $http.get('/api/blogs/countByYearMonth/').success(function(result) {
      $scope.years = result.years;
      for(var i=0;i<$scope.years.length;i++){
        if(i===0) {
          $scope.years[i].expanded=false;
        }
        else
        {
          $scope.years[i].expanded=true;
        }
      }
    });

    $scope.expand = function (year) {
      for(var i=0;i<$scope.years.length;i++){
        if(year.year===$scope.years[i].year) {
          $scope.years[i].expanded=!$scope.years[i].expanded;
        }
      }
    };

  });
