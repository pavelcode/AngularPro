'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.templatelist',
  'myApp.detail'
])
.constant("appConfig",{
	pageSize:10,
	urlAdd:"http://api.douban.com"
})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.controller("navController",["$scope","$location","appConfig",function($scope,$location,appConfig){
       //打印全局配置
       console.log(appConfig);

      //打印获得路径
      console.log("path="+$location.path());

      $scope.$location = $location;
      //方式1
      //根据路径判断获得焦点状态
      $scope.$watch("$location.path()",function(now){
           if(now.startsWith("/view1")){
              $scope.column="view1";
           }
           else if(now.startsWith("/templatelist/coming_soon/")){
           	   $scope.column="coming_soon";
           }else if(now.startsWith("/templatelist/in_theaters")){
           	   $scope.column="in_theaters";
           }
      });
}]);
