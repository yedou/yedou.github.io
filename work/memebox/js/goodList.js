//分页下一页
$(".pager-list .next a").hover(function() {
	$(this).stop().animate({backgroundPositionY:"-60px"},200);
},function() {
	$(this).stop().animate({backgroundPositionY:"-10px"},200);
})
//商品列表加载信息
var num = 1;
function goodListAjax(num) {
	$.ajax({
	url:"../data/goodList/goodList.json",
	type:"get",
	success:function(data) {
		var oData = data[0];
			$(".good-image").each(function(index) {
				var oAttr = "good"+(index+num);
			$(this).find("img").attr("src",oData[oAttr].img);
			$(this).find("a").attr("href","goodDetail.html");
			$(".title").eq(index).text(oData[oAttr].title);
			$(".sub-title").eq(index).text(oData[oAttr]["sub-title"]);
			$(".price-old").eq(index).text(oData[oAttr]["price-old"]);
			$(".price-now").eq(index).text(oData[oAttr]["price-now"]);
		});
			num*=2;

	}
})
}
goodListAjax(1);
$(".pager .next a").click(function() {
	num++;
	if(num>=5) {
		num=5;
	}
	$(this).parents("ol").find("li").eq(num-1).addClass("active").siblings().removeClass("active");
	goodListAjax(num);
});
$(".pager li").not(".next").click(function() {
	num = $(this).index()+1;
	goodListAjax(num);
	$(this).addClass("active").siblings().removeClass("active");
})
$(".pager li.next").hover(function() {
	$(this).addClass("active");
},function() {
	$(this).removeClass("active");
})
//将点击的商品存入cookie
function listGetCookie() {
	$(".good-image a").click(function() {
	var curGood = {};
	curGood.src = $(this).find("img").attr("src");
	curGood["title"] = $(this).parents("li").find(".title").text()+$(this).parents("li").find(".sub-title").text();
	curGood["sub-title"] = $(this).parents("li").find(".sub-title").text();
	curGood["price-old"] = $(this).parents("li").find(".price-old").text();
	curGood["price-now"] = $(this).parents("li").find(".price-now").text();
	var str = JSON.stringify(curGood);
	$.cookie("goodInfo",str,{expires:7,path:"/"});

})
}
listGetCookie();
//商品飞入购物车效果，应用了fly.js

$(".productor li .buy").click(function(event) {
 	//飞入购物车效果
var offset = $(".me-cart").offset(); //end 为在结束元素加一个ID ，将结束元素设置为fixed；
var addcar = $(this);
var img = addcar.parents("li").find('img').attr('src'); //定义图片地址
//将图片地址赋值给飞入效果的图片
var flyer = $('<img class="u-flyer" style="width:100px;height:100px;z-index:1000000;border-radius:50px" src="' + img + '">');
flyer.fly({
	start: {
		left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed 
		top: event.pageY - $(document).scrollTop() //开始位置（必填） 可视窗口的距离
	}
	, end: {
		left: offset.left, //结束位置（必填） 
		top: offset.top - $(document).scrollTop(), //结束位置（必填） 
		width: 0, //结束时宽度 
		height: 0 //结束时高度 
	}
	, onEnd: function () { //结束回调 
		this.destory(); //移除dom 
	}
});
})
