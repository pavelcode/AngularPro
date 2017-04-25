'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/index.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ["$scope","$http",function($scope,$http) {
       $scope.subjects = [];
       $scope.message = "";
       $http.get("/app/data1.json").then(function(result){
       	     console.log(result);
       	    if(result.status==200){
       	    	$scope.subjects = result.data.subjects;
       	    }else{
       	    	$scope.message ="数据访问错误";
       	    }
       },function(err){
       	   $scope.message ="数据访问错误"+err.statusText;
            console.log(err.toString());
       });
}]);