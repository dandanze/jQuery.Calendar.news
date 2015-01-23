# jQuery.Calendar.news
日历新闻插件，显示日历，点击有新闻的日期，显示具体新闻标题。
![](http://h.picphotos.baidu.com/album/s%3D1000%3Bq%3D90/sign=e583d50ef1d3572c62e298dcba235856/b2de9c82d158ccbf83d337dd1ad8bc3eb03541ee.jpg)
![](http://h.picphotos.baidu.com/album/s%3D1000%3Bq%3D90/sign=6b522592d588d43ff4a995f24d2ee96a/d8f9d72a6059252d437b9fe3379b033b5ab5b9ed.jpg)
## Related Plugins
![jQuery](http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js)
## Settings
```javascript
$.fn.Calendar.defaults = {
	news:"",
	theme:"default",//default simple
	language:"cn"//cn en
}
```
## Examples
引用文件：
```javascript
<script src="js/jquery.calendar.js"></script>
```
调用：
```javascript
//demo1  中文，有新闻事件
$("#dateNews").Calendar({
	news:[{year:2015,month:1,day:10,ev:"新闻标题1"},
		{year:2015,month:1,day:20,ev:"新闻标题2"}
});
//demo2 英文、简洁款
$("#dateNews2").Calendar({
	theme:"simple",
	language:"en"
});
```
