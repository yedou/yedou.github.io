//侧栏边框
$(".sidebar li").hover(function() {
	$(this).find(".tooltip").css("display","block").stop().animate({left:-92},300);
	$(this).siblings().find(".tooltip").css("display","none");
},function(){
	$(this).find(".tooltip").stop().animate({left:-120},300,function() {
		$(this).css("display","none");
	});
})
//返回顶部功能实现
// $(window).scroll(function() {
// 	if($(this).scrollTop()!=0) {
// 		$(".sidebar-bottom .me-back").css("display","block");
// 	} else {
// 		$(".sidebar-bottom .me-back").css("display","none");
// 	}
// })
// $(".sidebar-bottom .me-back").click(function() {
// 	$("body,html").animate({scrollTop:0},1000);
// })
function backTop() {
    var timer1 = null;
var isScroll = false;
var speed = 0;
window.onscroll = function() {
	if($(this).scrollTop()!=0) {
		$(".sidebar-bottom .me-back").css("display","block");
	} else {
		$(".sidebar-bottom .me-back").css("display","none");
		clearInterval(timer1);
	}
	if(!isScroll) {
		clearInterval(timer1);
	}
	isScroll = false;
}
$(".sidebar-bottom .me-back").click(function() {
	timer1 = setInterval(function() {
				var curTop=$(window).scrollTop();
				speed=Math.ceil($(window).scrollTop()/10);
				$(window).scrollTop(curTop-speed);
				isScroll = true;
			},30)
})
}
backTop();
//membox 新浪 微信二维码
$(".chat-item>img").hover(function() {
	$(this).next().show();
},function() {
	$(this).next().hide();
})
//点击人物选择下载
$(".fixedPerson .download").click(function() {
	$(".fixedPerson .person-dl").css("display","block");
	$(".fixedPerson .close").css("display","block");
})
$(".fixedPerson .close").click(function() {
	$(".fixedPerson .person-dl").css("display","none");
})
//购物车功能实现
function cartShow() {
	$(".me-cart").click(function() {
		$(".sidebar-cart").animate({right:40},200);
	});
	$(".cart-close").click(function() {
		$(".sidebar-cart").animate({right:-325},200);
	})
}
cartShow();

// function account(num) {
// 	var iPrice = parseFloat($(".item-price").text().substr(1))*num;
// 	iPrice="￥"+iPrice+".00";
// 	$(".cart-sum-left span").text(num);
// 	$(".cart-sum-right").text(iPrice);
// 	$(".cart-num-left span").text(num);
// 	$(".cart-num-right").text(iPrice);
// }
//获取购买商品的cookie
$(".buy button").click(function() {
	var oSrc = $(this).parents("li").find(".good-image img").attr("src");
	var oTitle = $(this).parents("li").find(".title").text()+$(this).parents("li").find(".sub-title").text();
	var oPrice = parseInt($(this).parents("li").find(".price-now").text().substr(1));
	var oNum = 1;
	var good = $.cookie("info")?JSON.parse($.cookie("info")):{};
	if(oTitle in good) {
		good[oTitle].num++;
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
//加减商品

addReduce();
function addReduce(good) {
		$("body").on("click",".item-reduce",function(e) {
			var good = JSON.parse($.cookie("info"));
			 var curGood = $(e.target).parents("li").find(".item-name a").text();
        	good[curGood].num--;
        	if(good[curGood].num<=1) {
            good[curGood].num = 1;
        }
        $.cookie("info",JSON.stringify(good),{expires:7,path:"/"});
        $(this).parent().find("span").text(good[curGood].num);
		$(".cart-list").html("");
		countResult();
		})
	$("body").on("click",".item-add",function(e) {
		var good = JSON.parse($.cookie("info"));
		var curGood = $(e.target).parents("li").find(".item-name a").text();
        good[curGood].num++;
        $.cookie("info",JSON.stringify(good),{expires:7,path:"/"});
        $(this).parent().find("span").text(good[curGood].num);
		$(".cart-list").html("");
		countResult();
	})
	$("body").on("click",".item-del",function() {
		var good = JSON.parse($.cookie("info"));
		var curGood = $(this).parents("li").find(".item-name a").text();
		delete good[curGood];
		$.cookie("info",JSON.stringify(good),{expires:7,path:"/"});
		$(".cart-list").empty();
		countResult();
	})
}

//计算购物车所有商品的总数和总价格
function countResult() {
	var allgood = $.cookie("info")?JSON.parse($.cookie("info")):{};
	var allNum = 0;
	var allPrice = 0;
	for(var attr in allgood) {
		allNum+=allgood[attr].num;
		allPrice+=allgood[attr].price*allgood[attr].num;
		var oLis = '<li class="clear">'+
	'<div class="cart-box">'+
	 	'<img src="'+allgood[attr].src+'" alt="">'+
	'</div>'+
	'<div class="cart-item">'+
		'<div class="item-name">'+
			'<a href="javascript:;">'+allgood[attr].title+'</a>'+
		'</div>'+
		'<div class="item-num">'+
			'<a class="item-reduce" href="javascript:;"></a>'+
			'<span>'+allgood[attr].num+'</span>'+
			'<a href="javascript:;" class="item-add"></a>'+
		'</div>'+
		'<div class="item-price">￥'+allgood[attr].price+'.00</div>'+
		'<a href="javascript:;" class="item-del"></a>'+
	'</div>'+
'</li>';
		$(".cart-list").append(oLis);
	}
	allPriceText = "￥"+allPrice+".00";
	$(".cart-content").find(".cart-sum-left span").text(allNum);
	$(".cart-content").find(".cart-num-left span").text(allNum);
	$(".cart-content").find(".cart-sum-right").text(allPriceText);
	$(".cart-content").find(".cart-num-right").text(allPriceText);
	
}
countResult();
//购物车里商品数量总计
function goodsNum() {
	var goods = $.cookie("info") ? JSON.parse($.cookie("info")) : {};
	var allNum = 0;
	if (!isEmporyObject(goods)) {
		for (var attr in goods) {
			allNum += goods[attr].num;
		}
		$(".me-cart .labelicon").text(allNum).css("visibility","visible");
	} else {
		$(".me-cart .labelicon").text("a").css("visibility","hidden");
	}
}
$("body").on("click",goodsNum);
//判断一个元素是不是空对象
function isEmporyObject(o) {
	var t;
	for(t in o) {
		return false;
	}
	return true;
}




