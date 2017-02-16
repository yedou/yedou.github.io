
//放大镜功能实现
$(".productor-midImg").hover(function() {
	$(".glass").css("display","block");
	$(".productor-big").css("display","block");
},function() {
	$(".glass").css("display","none");
	$(".productor-big").css("display","none");
});
	var iGlass = $(".glass").width();
	var iMidImg = $(".productor-midImg").width();
	var iBigBox = $(".productor-big").width();
$(".productor-midImg").mousemove(function(e) {
	var iGlassLeft = e.pageX - position($(this).get(0)).left-iGlass/2;
	var iGlassTop = e.pageY - position($(this).get(0)).top-iGlass/2;
	if(iGlassLeft<=0) {
		iGlassLeft = 0;
	} else if(iGlassLeft>=iMidImg-iGlass) {
		iGlassLeft = iMidImg-iGlass;
	}
	if(iGlassTop<=0) {
		iGlassTop = 0;
	} else if(iGlassTop>=iMidImg-iGlass) {
		iGlassTop = iMidImg-iGlass;
	}
	$(".glass").css({"left":iGlassLeft,"top":iGlassTop});
	var iBigBoxLeft = -(iBigBox/iGlass)*iGlassLeft;
	var iBigBoxTop = -(iBigBox/iGlass)*iGlassTop;
	$(".productor-big img").css({"left":iBigBoxLeft,"top":iBigBoxTop});

})
function position(obj) {
			var Pos = {left: 0,top: 0};
			while(obj) {
				Pos.left += obj.offsetLeft;
				Pos.top += obj.offsetTop;
				obj = obj.offsetParent;
			}
			return Pos;
		}
//商品详情介绍
$(".detial-tab li a").click(function() {
	$(this).addClass("current").parent().siblings().find("a").removeClass("current");
	$(".tab-content>div").eq($(this).parent().index()).css("display","block").siblings().css("display","none");
})
//商品数量加减
function goodsNum() {
	var num = 1;
	$(".reduce").click(function() {
		num = $(".num-result").val();
		num--;
		if(num<=0) {
			num = 1;
		}
		$(".num-result").val(num);
	});
	$(".add").click(function() {
		num = $(".num-result").val();
		num++;
		if(num>=20) {
			num = 20;
		}
		$(".num-result").val(num);
	});
}
goodsNum();
//通过cookie获取商品列表上点击的物品
function getGood() {
	var curGood = JSON.parse($.cookie("goodInfo"));
	$(".productor-sm img").attr("src",curGood.src);
	$(".productor-mid img").attr("src",curGood.src);
	$(".productor-big img").attr("src",curGood.src);
	$(".title h1").text(curGood["title"]);
	$(".price-old .price-num").text(curGood["price-old"]);
	$(".price-now .price-num").text(curGood["price-now"]);
}
getGood();
//获取购买商品的cookie
$(".add-cart").click(function() {
	var oSrc = $(this).parents(".productor-view").find(".productor-big img").attr("src");
	var oTitle = $(this).parents(".productor-view").find("h1").text();
	var oPrice = parseInt($(this).parents(".productor-view").find(".price-num").text().substr(1));
	var oNum =  parseInt($(this).parents(".productor-view").find(".num-count input").val());
	var good = $.cookie("info")?JSON.parse($.cookie("info")):{};
	if(oTitle in good) {
		good[oTitle].num+=oNum;
	} else {
		good[oTitle]={
			src:oSrc,
			title:oTitle,
			price:oPrice,
			num:oNum
		}
	}
	$.cookie("info",JSON.stringify(good),{expires:7,path:"/"});
	good = JSON.parse($.cookie("info"));
//		addReduce(good);
		countResult();
    $(".cart-list").html("");
            for(var attr in good) {
		var oLi = '<li class="clear">'+
	'<div class="cart-box">'+
	 	'<img src="'+good[attr].src+'" alt="">'+
	'</div>'+
	'<div class="cart-item">'+
		'<div class="item-name">'+
			'<a href="javascript:;">'+good[attr].title+'</a>'+
		'</div>'+
		'<div class="item-num">'+
			'<a class="item-reduce" href="javascript:;"></a>'+
			'<span>'+good[attr].num+'</span>'+
			'<a href="javascript:;" class="item-add"></a>'+
		'</div>'+
		'<div class="item-price">'+'￥'+good[attr].price+'.00'+'</div>'+
		'<a href="javascript:;" class="item-del"></a>'+
	'</div>'+
'</li>';
		$(".cart-list").append(oLi);
	}
//addReduce(good);
//countResult();
});
//商品飞入购物车效果，应用了fly.js

$(".add-cart").click(function(event) {
 	//飞入购物车效果
var offset = $(".me-cart").offset(); //end 为在结束元素加一个ID ，将结束元素设置为fixed；
var addcar = $(this);
var img = addcar.parents(".productor-view").find(".productor-big img").attr("src");; //定义图片地址
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