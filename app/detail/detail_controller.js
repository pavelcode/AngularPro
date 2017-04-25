/*
* @Author: pavel
* @Date:   2017-04-25 14:20:47
* @Last Modified by:   pavel
* @Last Modified time: 2017-04-25 14:41:40
*/

'use strict';

angular.module('myApp.detail', ['ngRoute','myservice.httpservice'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/detail/:id', {
    templateUrl: 'detail/index.html',
    controller: 'DetailCtrl'
  });
}])

.controller('DetailCtrl', ["$scope","$route","$routeParams","HttpService",function($scope,$route,$routeParams,HttpService) {
          //获得id参数
          var id = $routeParams.id;
          console.log("detailid="+id);
         //执行jsonP
          var url = " https://api.douban.com/v2/movie/subject/"+id;
          $scope.movie = {};
          HttpService.jsonp(url,{},function(data){
              $scope.movie = data;
              console.log("movie="+$scope.movie.title);
               $scope.$apply(); //Scope提供$apply方法传播Model的变化。
          });
     
      
         
       

}]);