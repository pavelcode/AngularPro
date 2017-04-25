/*
* @Author: pavel
* @Date:   2017-04-18 10:03:27
* @Last Modified by:   pavel
* @Last Modified time: 2017-04-18 11:08:07
*/

'use strict';
(function (window,document) {
	var jsonp = function(url,data,callback){
               //给url添加随机的回调函数名字
               var cb_funcName = "mycb"+Math.random().toString().replace(".","");
                console.log(cb_funcName);
               //给window对象挂载一个属性函数
               window[cb_funcName] = callback;
                console.log(window);
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
		
           	  //将script标签放在页面中
           	   console.log(script);
           	   //console.log(document.body);
           	   document.body.appendChild(script);
	}
	//把jsonp函数暴露出来
	window.$jsonp = jsonp;
})(window,document);