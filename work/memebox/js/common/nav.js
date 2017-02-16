//将共同的头部和尾部加入到页面
$.ajax({
			url:"common/header.html",
			async:false,
			success:function(data) {
				$(".header").html(data);
			}
		})
$.ajax({
			url:"common/footer.html",
			async:false,
			success:function(data) {
				$(".footer").html(data);
			}
		})
$.ajax({
			url:"common/fixed.html",
			async:false,
			success:function(data) {
				$(".sidebar").html(data);
			}
		})
//搜索框动画效果
$(".form-container input").focus(function() {
	$(this).parent().css("border-width","2px");
})
$(".form-container input").keyup(function() {
	$(this).next().css("display","block");
	if($(this).val()=="") {
		$(this).next().css("display","none");
	}
})
$(".form-container .icon-delete").click(function() {
	$(this).prev().val("");
	$(this).hide();
})
$(".form-container input").blur(function() {
	$(this).parent().css("border-width","1px");
})
//搜索框jsonp
$(".form-container input").keyup(function() {
	var oInput = $(this);
	$.ajax({
		url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+oInput.val()+"&json=1&p=3",
		dataType:"jsonp",
		jsonp:"cb",
		success:function(data) {
			var aData = data.g;
			var oUl = $(".form-menu ul");
			oUl.html("");
			for(var i in aData) {
				var oLi = $("<li></li>");
				oLi.html(aData[i].q);
				oUl.append(oLi);
			}
		}
	})
})
//在搜索框里面选择内容
$("body").on("click",".form-menu ul li",function() {
	var val=$(this).text();
	$(".form-container input").val(val);
	$(this).parent().find("li").css("display","none");
})
//所有商品菜单

// $(".classify-container .ul1>li").hover(function(){
// 	$(this).find(".sub-classify").show();
// },function(){
// 	$(this).find(".sub-classify").hide();
// })

$("body").on("mouseover",".ul1>li",function(e) {
	$(this).find(".sub-classify").show();
})
$("body").on("mouseout",".ul1>li",function(e) {

	$(this).find(".sub-classify").hide();
})
//二级菜单显示
// $("#nav>li").hover(function(){
// 	$(this).find(".item-sub").css("display","block").stop().animate({opacity:1},200);
// },function() {
// 	$(this).find(".item-sub").stop().animate({opacity:0},200,function(){
// 		$(this).css("display","none");
// 	});
// })
$("body").on("mouseover","#nav>li",function() {
	$(this).find(".item-sub").css("display","block").stop().animate({opacity:1},200);
});
$("body").on("mouseout","#nav>li",function() {
	$(this).find(".item-sub").stop().animate({opacity:0},200,function(){
		$(this).css("display","none");
	});
})
//加载菜单栏
$.ajax({
	type:"get",
	url:"../data/index/lunbo.json",
	async:true,
	success:function(data) {
		//商品分类列表
		var classify = data.classify;
		var classifyIndex = 0;
		for(var attr in classify) {
			var classifyLen = classify[attr].length;
			var classfiyParent = $('<li>'+
									'<p><a href="javascript:;">'+attr+'</a></p>'+
									'<div class="sub-classify">'+
										'<ul class="ul2"></ul>'+
									'</div>'+
								'</li>');
			$(".ul1").append(classfiyParent);
			for(var j = 0;j<classifyLen;j++) {

				var item = $('<li><a href="javascript:;">'+classify[attr][j]+'</a></li>');
				$(".ul2").eq(classifyIndex).append(item);
			}
			classifyIndex++;
		}
		//json加载二级菜单
		var attrSubArr = [];
		for(var attrSub in data.classifySub) {
				attrSubArr.push(attrSub);
			}
		$(".item").each(function(index) {
			if($(this).children("a").text() == attrSubArr[index]&&data.classifySub[attrSubArr[index]].length!=0) {
				var itemBox = $('<div class="item-sub"><ol></ol></div>');
				$(this).append(itemBox);
				for(var i = 0;i<data.classifySub[attrSubArr[index]].length;i++) {

					$(this).find("ol").append($('<li><a href="javascript:;">'+data.classifySub[attrSubArr[index]][i]+'</a></li>'));
				}
			}
		})
	}
});
//登录过后将用户名添加到所有包含头部的id上
function pageRefresh() {
	var a = $.cookie("usrname");
	if(a) return false;
    $(".header-top-right li").eq(0).find("a").text("登录").attr("href","login.html");
	$(".header-top-right li").eq(1).find("a").text("注册").attr("href","regist.html");
}
pageRefresh();
function addUserName() {
	var username = $.cookie("usrname");
	if(!username) return false;
	$(".header-top-right li").eq(0).find("a").text(username);
	$(".header-top-right li").eq(0).find("a").attr("href","javascript:;");
	$(".header-top-right li").eq(1).find("a").text("退出");
	if($(".header-top-right li").eq(1).find("a").text()=="退出") {
//		$.cookie("usrname","",{expires:-1,path:"/"});
        $(".header-top-right li").eq(1).find("a").click(function(e) {
           $.cookie("usrname","",{expires:-1,path:"/"}); 
            $(".header-top-right li").eq(0).find("a").text("登录");
            $(this).text("注册");
			$(".header-top-right li").eq(0).find("a").attr("href","login.html");
            e.preventDefault();
        })
	}
    
}
addUserName();
