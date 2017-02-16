//ajax加载图片
function addImg() {
	$.ajax({
	type:"get",
	url:"../data/index/lunbo.json",
	async:true,
	success:function(data) {
		
		$(".sliderImg li img").each(function(index) {
			$(this).attr("src",data.slider[index]);
		});
		$(".promotion .goods p img").each(function(index) {
			$(this).attr("src",data.promotion[index]);
		});
		//商品分类列表
		// var classify = data.classify;
		// var classifyIndex = 0;
		// for(var attr in classify) {
		// 	var classifyLen = classify[attr].length;
		// 	var classfiyParent = $('<li>'+
		// 							'<p><a href="javascript:;">'+attr+'</a></p>'+
		// 							'<div class="sub-classify">'+
		// 								'<ul class="ul2"></ul>'+
		// 							'</div>'+
		// 						'</li>');
		// 	$(".ul1").append(classfiyParent);
		// 	for(var j = 0;j<classifyLen;j++) {

		// 		var item = $('<li><a href="javascript:;">'+classify[attr][j]+'</a></li>');
		// 		$(".ul2").eq(classifyIndex).append(item);
		// 	}
		// 	classifyIndex++;
		// }
	}
});
}
addImg();
//json加载商品图片
$.ajax({
	type:"get",
	url:"../data/index/goods.json",
	async:true,
	success:function(data) {
		var highSpeedImgs = data.img.highSpeed;
		$(".highSpeed .goods li").find("img").each(function(index){
			$(this).attr("src",highSpeedImgs[index]);
		});
		var directMailImgs = data.img.directMail;
		$(".directMail .goods li").find("img").each(function(index){
			$(this).attr("src",directMailImgs[index]);
		});
		var ponyEffectImgs = data.img.ponyEffect;
		$(".ponyEffect .goods li").find("img").each(function(index){
			$(this).attr("src",ponyEffectImgs[index]);
		});
		var personalCareImgs = data.img.personalCare;
		$(".personalCare .goods li").find("img").each(function(index){
			$(this).attr("src",personalCareImgs[index]);
		});
		$(".highSpeed,.directMail,.ponyEffect,.personalCare").each(function(index) {
			$(this).find(".banner1 img").attr("src",data.img.title[index]);
		})
	},
	error:function() {
		console.log("shibai");
	}
});

//banner 轮播图
//总共8张图片，iNow=0....7,
var iNow = 0;
var iWidth = $(".sliderImg ul li").width();
var timer = null;
function autoPlay() {
	clearInterval(timer);
	timer =	setInterval(function(){
				iNow++;
				if(iNow == 8) {
					iNow = 0;
				}
				$(".sliderImg ul").stop().animate({left:-iNow*iWidth},1000);
				$(".sliderIndex ul li").eq(iNow).addClass("active").siblings().removeClass("active");
			},3000);
}
autoPlay();
$(".sliderIndex ul li a").click(function() {
	$(this).parent().addClass("active").siblings().removeClass("active");
	iNow = $(this).parent().index();
	$(".sliderIndex ul li").eq(iNow).addClass("active").siblings().removeClass("active");
	$(".sliderImg ul").stop().animate({left:-iNow*iWidth},1000);
});
//不能对颜色进行操作
// $(".sliderIndex ul li a").hover(function(){
// 	$(this).stop().animate({background:"#ff5073"},200);
// },function(){
// 	$(this).stop().animate({background:"#fff"},200);
// });
$(".slider").hover(function() {
	clearInterval(timer);
},function() {
	autoPlay();
});
//楼梯动画效果和吸顶效果
//吸顶
var iStairsTop = $(".stairs").offset().top;
$(window).scroll(function() {
	var iScrollTop1 = $(window).scrollTop();
	if(iStairsTop<=iScrollTop1) {
		$(".stairs").css({"position":"fixed","top":0,"left":0,"visibility":"visible"});
	} else {
		$(".stairs").css({"position":"relative","visibility":"hidden"});
	}
})	
//楼梯
var isClick = null;
$(".stairs li a").click(function() {
    isClick = true;
	var iGoodListTop = $(".goodsList").eq($(this).parent().index()).offset().top-30;
	$(this).parent().addClass("active").siblings().removeClass("active");
	$("body,html").stop().animate({scrollTop:iGoodListTop},"fast",function() {
        isClick = false;
    });
})
$(window).scroll(function() {
		if(!isClick) {
            var iScrollTop2 = $(this).scrollTop();
		$(".goodsList").each(function() {
		var curTop = $(this).offset().top;
		if(iScrollTop2>=curTop-100) {
			$(".stairs li").eq($(this).index()).addClass("active").siblings().removeClass("active");
		}
	})
        }
})
//使用cookie存入商品信息加入到商品详情列表中
//使用cookie存入商品信息
function listGetCookie() {
    $(".goods li a").click(function() {
        var curGood = {};
        curGood.src=$(this).find("img").attr("src");
        curGood["title"]=$(this).parents("li").find("h4").text()+$(this).parents("li").find("h3").text();//这是修改的代码
        curGood["sub-title"]=$(this).parents("li").find("h3").text();
        curGood["price-old"]=$(this).parents("li").find(".previous").text();
        curGood["price-now"]=$(this).parents("li").find(".current-price").text();
        var str = JSON.stringify(curGood);
        $.cookie("goodInfo",str,{expires:7,path:"/"});
    })
}
listGetCookie();
//添加购买商品到购物车中去
$(".goods button").click(function() {
	var oSrc = $(this).parents("li").find("img").attr("src");
	var oTitle = $(this).parents("li").find("h4").text()+$(this).parents("li").find("h3").text();
	var oPrice = parseInt($(this).parents("li").find(".current-price").text().substr(1));
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
});

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
//商品飞入购物车效果，应用了fly.js

$(".goods li button").click(function(event) {
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
	