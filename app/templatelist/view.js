'use strict';

angular.module('myApp.templatelist', ['ngRoute','myservice.httpservice'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/templatelist/:type/:currentPage', {
    templateUrl: 'templatelist/index.html',
    controller: 'TemplatelistCtrl'
  });
}])

.controller('TemplatelistCtrl', ["$scope","$route","$routeParams","HttpService",function($scope,$route,$routeParams,HttpService) {
       //获取分页参数
       var currentPage = parseInt($routeParams.currentPage);
       console.log("currentPage="+currentPage);
       //count是每页显示的值，start是开始的记录数
       var pageCount = 3;
       var pageStart = (currentPage-1)*pageCount;

       $scope.title = "";
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
       console.log("type:="+$routeParams.type);
      //$routeParams.q可以从连接中获得数据，也可以从？中获得
        console.log("q="+$routeParams.q);
         HttpService.jsonp("https://api.douban.com/v2/movie/"+$routeParams.type, {start:pageStart,count:pageCount,q:$routeParams.q},function(data){
       
          console.log('222'+data.subjects);
          $scope.title = data.title;
          $scope.subjects =  data.subjects;
          $scope.totalRecord = data.total;
          $scope.totalPages = Math.ceil($scope.totalRecord/pageCount);
          $scope.loading = false;
          $scope.$apply(); //Scope提供$apply方法传播Model的变化。
          
       });

}]);