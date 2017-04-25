'use strict';

angular.module('myApp.view3', ['ngRoute','myservice.httpservice'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3/:currentPage', {
    templateUrl: 'view3/index.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ["$scope","$route","$routeParams","HttpService",function($scope,$route,$routeParams,HttpService) {
       //获取分页参数
       var currentPage = parseInt($routeParams.currentPage);
       console.log("currentPage="+currentPage);
       //count是每页显示的值，start是开始的记录数
       var pageCount = 3;
       var pageStart = (currentPage-1)*pageCount;

       
       $scope.subjects = [];
       $scope.message = "";
       $scope.totalRecord = 0;
       $scope.totalPages = 0;
       $scope.loading = true;
       $scope.currentPage = currentPage;
       

        //定义上一页，下一页的方法
       $scope.goPage = function(page){
              console.log("goPage="+page);
              if(page>=1&&page<=$scope.totalPages){
                $route.updateParams({currentPage:page});
              }
       }
       HttpService.jsonp("https://api.douban.com/v2/movie/top250", {start:pageStart,count:pageCount},function(data){
          console.log('222'+data.subjects);
          $scope.subjects =  data.subjects;
          $scope.totalRecord = data.total;
          $scope.totalPages = Math.ceil($scope.totalRecord/pageCount);
          $scope.loading = false;
          $scope.$apply(); //Scope提供$apply方法传播Model的变化。
          
       });

}]);