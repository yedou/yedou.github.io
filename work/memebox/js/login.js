
function registFooter() {
	$.ajax({
			url:"common/footer.html",
			async:false,
			success:function(data) {
				$(".footer").html(data);
			}
		})
}
registFooter();
function loginTest() {
	$(".regist-btn input").click(function(e) {
		e.preventDefault();
		var userNameVal = $(".userName input").val();
		var pwdVal = $(".pwd input").val();
		if(userNameVal=="") {
			$(".userName div").text("必填字段").css("display","block")
			.animate({"opacity":1},200);
		} else {
			$(".userName div").animate({"opacity":0},200,function() {
				$(this).css("display","none").text("");
			});
		}
		if(pwdVal=="") {
			$(".pwd div").text("必填字段").css("display","block")
			.animate({"opacity":1},200);
		}
		else if(pwdVal.length<6) {
			$(".pwd div").text("最小长度为6").css("display","block")
			.animate({"opacity":1},200);
		} else {
			$(".pwd div").animate({"opacity":0},200,function() {
				$(this).css("display","none").text("");
			});
		}
		//通过错误提示来判断表单是否提交，错误提示实在200ms后才能准确判断
		setTimeout(function(){
			if($(".userName div").text()=="" && $(".pwd div").text()=="") {
			$.cookie("usrname",userNameVal,{expires:7,path:"/"});
				var isCart = $.cookie("account")?$.cookie("account"):0;
				if(isCart) {
					location.href = "pay.html";
					$.cookie("account","",{expires:7,path:"/"});
				} else {
					location.href = "index.html";
				}
				
		}
		},300)
	})
}
loginTest();
//给登录列表添加实时验证


$(".userName input").on("keyup blur",function() {
	if($(this).val()=="") {
		$(this).next().text("必填字段").css("display","block")
			.animate({"opacity":1},200);
	} else {
		$(".userName div").animate({"opacity":0},200,function() {
				$(this).css("display","none").text("");
			});
	}
}) 
$(".pwd input").on("keyup blur",function() {
		if($(this).val()=="") {
		$(this).next().text("必填字段").css("display","block")
			.animate({"opacity":1},200);
	}else if($(this).val().length<6) {
			$(this).next().text("最小长度为6").css("display","block")
			.animate({"opacity":1},200);
		} else {
			$(this).next().animate({"opacity":0},200,function() {
				$(this).css("display","none").text("");
			});
		}
})