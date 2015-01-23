;(function($){	
	$.fn.Calendar = function(options){
		var opts = $.extend({},$.fn.Calendar.defaults,options);
		return this.each(function(){
			var creatCale;
			if(opts.language =="cn"){
				creatCale = '<div class="CalendarBox">\
									<div class="CalendarPre">&lt;&lt;</div>\
									<div class="CalendarNext">&gt;&gt;</div>\
									<span class="CalendarYear"></span>年 <span class="CalendarMonth"></span>月\
									<table>\
										<thead>\
											<tr> \
												<th>日</th> \
												<th>一</th>\
												<th>二</th> \
												<th>三</th> \
												<th>四</th> \
												<th>五</th> \
												<th>六</th> \
											</tr> \
										</thead> \
										<tbody class="Calendar"></tbody>\
									</table>\
								</div> ';
			}
			else{
				creatCale = '<div class="CalendarBox">\
									<div class="CalendarPre">&lt;</div>\
									<div class="CalendarNext">&gt;</div>\
									<span class="CalendarYear"></span> <span class="CalendarMonth"></span>\
									<table>\
										<thead>\
											<tr> \
												<th>SUN</th> \
												<th>MON</th>\
												<th>TUE</th> \
												<th>WED</th> \
												<th>THU</th> \
												<th>FRI</th> \
												<th>SAT</th> \
											</tr> \
										</thead> \
										<tbody class="Calendar"></tbody>\
									</table>\
								</div> ';
			}
			$(this).append(creatCale);
			var that =$(this).find(".Calendar"),perMonth=$(this).find(".CalendarPre"),nextMonth=$(this).find(".CalendarNext");
			var Year = new Date().getFullYear(), 
				Month = new Date().getMonth() + 1,
				Days = [];//日期列表 
			function Draw(){ 
					var arr = []; 
					for(var i = 1, firstDay = new Date(Year, Month - 1, 1).getDay(); i <= firstDay; i++){ arr.push(" "); } 
					for(var i = 1, monthDay = new Date(Year, Month, 0).getDate(); i <= monthDay; i++){ arr.push(i); } 
					if(opts.theme == "simple"){
						that.parents(".CalendarBox").addClass("simple");
					}
					var frag = document.createDocumentFragment(); 
					Days = []; 
					while(arr.length > 0){ 
						var row = document.createElement("tr"); 
						for(var i = 1; i <= 7; i++){ 
								var cell = document.createElement("td"); 
								cell.innerHTML = " "; 
								if(arr.length > 0){ 
									var d = arr.shift(); 
									cell.innerHTML = d; 
									if(d > 0){ 
										Days[d] = cell; 
										if(IsSame(new Date(Year,Month-1,d),new Date())){
											$(cell).addClass("onToday");
										}
									} 
								} 
								row.appendChild(cell); 
							} 
							frag.appendChild(row); 
					} 
					while(that.html()!=""){ that.html(""); } 
						that.append(frag); 
						onFinish(); 
			}
			function IsSame(d1, d2) { 
				return (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate()); 
			} 
			function PreMonth(){
				var d = new Date(Year, Month - 2, 1); 
				Year = d.getFullYear(); 
				Month = d.getMonth() + 1; 
				Draw(); 
			}
			function NextMonth(){
				var d = new Date(Year, Month, 1); 
				Year = d.getFullYear(); 	
				Month = d.getMonth() + 1; 
				Draw(); 
			}
			function onFinish(){ 
				var Cbox = that.parents(".CalendarBox");
				Cbox.find(".CalendarYear").text(Year); 
				if(opts.language =="cn"){
					Cbox.find(".CalendarMonth").text(Month); 
				}
				else{
					var m = Month;
					switch (m){
						case 1:eMonth = "January";break;
						case 2:eMonth = "February";break;
						case 3:eMonth = "March";break;
						case 4:eMonth = "April";break;
						case 5:eMonth = "May";break;
						case 6:eMonth = "June";break;
						case 7:eMonth = "July";break;
						case 8:eMonth = "August";break;
						case 9:eMonth = "September";break;
						case 10:eMonth = "October";break;
						case 11:eMonth = "November";break;
						case 12:eMonth = "December";break;
						default:return;
					}
					Cbox.find(".CalendarMonth").text(eMonth); 
				}
				if(opts.news){
					var flag = opts.news,evHtml="";
					if(Cbox.siblings(".CalendarEvent").size() == 0){
						Cbox.after("<div class='CalendarEvent'></div>");
					}
					Cbox.find(".CalendarEvent").html("");
					for(var i = 0, len = flag.length; i < len; i++){ 
						if(flag[i].year == Year && flag[i].month == Month){
							$(Days[flag[i].day]).addClass("hasEvent");
							$(Days[flag[i].day]).attr("title",flag[i].ev); 
							evHtml += "<li>"+flag[i].day+"号活动:"+flag[i].ev+"</li>";
							Cbox.siblings(".CalendarEvent").html("<ul>"+evHtml+"</ul>"); 
						}
					} 
				}
	
			}
			perMonth.click(function(){
				PreMonth();
			});
			nextMonth.click(function(){
				NextMonth();
			});
			$(".hasEvent").live("click",function(){
				var t_title = $(this).attr("title");
				$(this).parents(".CalendarBox").siblings(".CalendarEvent").html("<ul><li>"+$(this).html()+"号活动:"+t_title+"</li></ul>"); 
			});
			Draw();
		});		
	}
	$.fn.Calendar.defaults = {
		news:"",
		theme:"default",//default simple
		language:"cn"//cn en
	}
})(jQuery);