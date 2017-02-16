// 侧边栏二级导航单index指标位置
$(".main-nav li>a").click(function() {
	$(this).next().slideToggle().parent().siblings().find(".sub-nav").slideUp();

})
$(".sub-nav li a").hover(function() {
        var $index=$(this).parent().index();//获取li指标的位置
        var $liWidth = $(this).parent().height();//获取li的高度
        var curTop = $index*$liWidth;
        $(".index").stop().animate({top:curTop},"slow");
})
//调用百度jsonp接口，实现搜索功能
$(".search input").keyup(function() {
	if($(this).val()=="") {
		$(".search ul").css("display","none");
	} else {
		$(".search ul").css("display","block");
	}


	$oInput = $(this);
	$.ajax({
		url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+$oInput.val()+"&json=1&p=3",
		dataType:"jsonp",
		jsonp:"cb",
		success:function(data) {
			var arr = data.s;
			var i = 3;
			for( i in arr) {
				$(".search ul li a").eq(i).html(arr[i]);
			}
		}
	})
})
//在搜索框里面选择内容
$("body").on("click",".search ul li a",function() {
	var val=$(this).text();
	$(".search input").val(val);
	$(this).parents("ul").css("display","none");
})

//换回顶部按钮
function backTop() {
	var isScorll = false;
	var timer = null;
	var speed = 0;
	$(window).scroll(function() {

		if($(this).scrollTop()!=0) {
			$(".backTop").css("display","block");
		} else {
			$(".backTop").css("display","none");
			clearInterval(timer);
		}
		if(!isScorll) {
			clearInterval(timer);
		}
		isScorll = false;
	})
	$(".backTop").click(function() {
		timer = setInterval(function() {
			var curTop = $(window).scrollTop();
			speed =  Math.ceil(curTop/10);
			$(window).scrollTop(curTop-speed);
			isScorll = true;
		},10)
	})
}
backTop();
