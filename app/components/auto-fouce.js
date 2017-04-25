/*
* @Author: pavel
* @Date:   2017-04-21 11:20:57
* @Last Modified by:   pavel
* @Last Modified time: 2017-04-24 13:54:32
*/

'use strict';
//定义一个自动聚焦的指令
(function(angular){
   angular.module("directive.auto_focus",[])
   .directive("autoFocus",["$location",function($location){
   	    return{
   	    	 restrict : "A", 
   	    	 //iElm 使用该指令的元素
   	    	 //iAttrs 使用当前指令元素的所有属性
             link:function($scope,iElm,iAttrs,controller){
             	console.log("iElm="+iElm);
                $scope.$location = $location;
                $scope.$watch("$location.path()",function(now){
                     //得到当前元素的href属性
                     var href =iElm.children().attr("href");
                     var type = href.substring(1);
                     console.log(type+"----"+now);
                     if(now.startsWith(type)){
                     	 console.log("active");
                     	 //清除所有的active
                     	iElm.parent().children().removeClass('active');
                     	iElm.addClass("active");
                     }
                });
             	
             }

          
   	    }   
   }]);
   
})(angular);