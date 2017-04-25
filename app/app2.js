'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'directive.auto_focus',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.templatelist'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.controller("searchController",["$scope","$route",function($scope,$route){
        $scope.keyword = "";
        $scope.search = function(){
          console.log("keyword="+ $scope.keyword);
          //更新参数
          $route.updateParams({q:$scope.keyword});
          $route.updateParams({type:"search"});
        }
}]);

