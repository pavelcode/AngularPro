/*
* @Author: pavel
* @Date:   2017-04-18 09:22:29
* @Last Modified by:   pavel
* @Last Modified time: 2017-04-24 16:28:51
*/

'use strict';

(function (angular) {
	var http = angular.module("myservice.httpservice",[]);
	http.service("HttpService",["$document",function($document){
           console.log("$document="+$document);
           //console.log("$window="+$window);
           this.jsonp = function(url,data,callback){
               //给url添加随机的回调函数名字
               var cb_funcName = "mycb"+Math.random().toString().replace(".","");
                console.log(cb_funcName);
             
		       //将data转换成url字符串的形式
		       var queryString = url.indexOf("?")==-1?"?":"&";
		       for(var key in data){
		       	queryString +=key+"="+data[key]+"&";
		       }
               queryString += "callback="+cb_funcName;          	  
           	  //创建script标签
           	   var script = document.createElement("script");
           	   console.log(url+queryString);
			         script.src = url+queryString;


              //给window对象挂载一个属性函数
              // window[cb_funcName] = callback; 等同于
              window[cb_funcName] = function(data){
                 callback(data);
                 //当回调执行完成之后，移除jsonp
                 document.body.removeChild(script);
              }
		
           	  //将script标签放在页面中
           	   console.log(script);
           	   //console.log(document.body);
           	   document.body.appendChild(script);
	  }
	}]);
	
})(angular);