//将脚部文件导入到支付
$.ajax({
			url:"common/footer.html",
			async:false,
			success:function(data) {
				$(".footer").html(data);
			}
		})
//将商品整理
function tableList() {
	var goods = $.cookie("info")?JSON.parse($.cookie("info")):{};
	var allNum = 0;
	for(var attr in goods) {
		var trItem = '<tr class="t-two">'+
	'<td>'+
		'<a class="good1" href="javascript:;">'+
			'<img src="'+goods[attr].src+'" alt="">'+
		'</a>'+
		'<div>'+
			'<a href="javascript:;">'+goods[attr].title+'</a>'+
		'</div>'+
	'</td>'+
	'<td>--</td>'+
	'<td><span class="unit-price">￥'+goods[attr].price+'.00</span></td>'+
	'<td>'+
		'<button class="reduce">-</button><input type="text" value="'+goods[attr].num+'" /><button class="add">+</button>'+
	'</td>'+
	'<td><span class="unit-all">￥'+goods[attr].price*goods[attr].num+'.00</span></td>'+
	'<td>'+
		'<a class="collection" href="javascript:;">移入我的收藏 </a>'+
		'<a class="del" href="javascript:;">删除</a>'+
	'</td>'+
'</tr>';
		$(".t-two").parent().append(trItem);
		//购物车总价格
		allNum+=goods[attr].price*goods[attr].num;
	}
	$(".t-three .amount,.account-price").each(function(index) {
			$(this).text("￥"+allNum+".00");
		});
}
tableList();
//通过加减方式来确定数量
function reduce() {
	$(".reduce").click(function () {
		var goods = $.cookie("info") ? JSON.parse($.cookie("info")) : {};
		var goodItem = $(this).parents(".t-two").find("td:eq(0) a").text();
		var allprice = 0;
		console.log(goodItem);
		var curNum = $(this).next().val();
		curNum--;
		if (curNum <= 1) {
			curNum = 1;
		}
		$(this).next().val(curNum);
		if(goodItem in goods) {
			goods[goodItem].num = curNum;
		}
		$(this).parents(".t-two").find(".unit-all").text("￥"+goods[goodItem].num*goods[goodItem].price+".00");
		//减少后所有物品价格
		for(var attr in goods) {
			allprice+=goods[attr].price*goods[attr].num;
		}
		$(".t-three .amount,.account-price").each(function(index) {
			$(this).text("￥"+allprice+".00");
		})
		allprice = 0;
		$.cookie("info",JSON.stringify(goods),{expires:7,path:"/"});
	})
}
reduce();
//增加商品数量
function add() {
	
		var bllprice = 0;
	$(".add").click(function () {
		var goodItem = $(this).parents(".t-two").find("td:eq(0) a").text();
		var goods = $.cookie("info") ? JSON.parse($.cookie("info")) : {};
		console.log(goodItem);
		var curNum = $(this).prev().val();
		curNum++;
		$(this).prev().val(curNum);
		if(goodItem in goods) {
			goods[goodItem].num = curNum;
		}
		console.log(goods[goodItem].num);
		$(this).parents(".t-two").find(".unit-all").text("￥"+goods[goodItem].num*goods[goodItem].price+".00");
		//减少后所有物品价格
		for(var attr in goods) {
			bllprice+=goods[attr].price*goods[attr].num;
		}
		$(".t-three .amount,.account-price").each(function(index) {
			$(this).text("￥"+bllprice+".00");
		})
		bllprice = 0;
		$.cookie("info",JSON.stringify(goods),{expires:7,path:"/"});
	})
}
add();
// 删除购物车单个商品
function removeCart() {
	$(".del").click(function() {
		//最后再来删除
//		$(this).parents(".t-two").remove();
		var allpirce = 0;
		var goods = $.cookie("info") ? JSON.parse($.cookie("info")) : {};
		var Item = $(this).parents(".t-two").find("td:eq(0) div a").text();
		delete goods[Item];
		$(this).parents(".t-two").remove();
		$.cookie("info",JSON.stringify(goods),{expires:7,path:"/"});
		goods = JSON.parse($.cookie("info"));
		console.log(goods);
		for(var attr in goods)  {
			allpirce+=goods[attr].num+goods[attr].price;
		}
		$(".t-three .amount,.account-price").each(function(index) {
			$(this).text("￥"+allpirce+".00");
		});
	})
}
removeCart();
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
//最终结算 判断用户是否登录成功
function account() {
    $(".account-btn").click(function(e) {
        if($(".header-top-right li").eq(0).text()=="登录") {
			$.cookie("account","1",{expires:7,path:"/"});
            location.href="login.html";
        } else {
            alert("结算成功");
        }
    });
}
account();
