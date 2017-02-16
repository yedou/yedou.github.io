//加入脚部
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
//验证手机号 表单验证
// var pattern = /^1[3|4|5|7|8]\d{9}$/;电话号码正则
// ^[a-zA-Z]\w{6,16}$ 密码正则
function testTel() {
	var pattern = /^1[3|4|5|7|8]\d{9}$/;
	$(".verification a").click(function() {
		var testTel = pattern.test($(".tel input").val());
		var testPwd = $(".pwd input").val().length;
		if(!testTel) {
			$(".error").css("display","block");
			$(".error .error-title").html("手机号码不正确");
			return false;
		}
		if(testTel&&(testPwd<6||testPwd>16)) {
			console.log(testTel);
			$(".error").css("display","block");
			$(".error .error-title").html("密码长度应为6~16个字符");
			return false;
		}
		if(!(/^[a-zA-Z]\w+$/.test($(".pwd input").val()))) {
			$(".error").css("display","block");
			$(".error .error-title").html("非法字符");
			return false;
		}
		return true;
	});
}
testTel();
//鼠标离开或键盘按下时表单验证
$(".tel input").on("keyup blur",function() {
	var pattern = /^1[3|4|5|7|8]\d{9}$/;
	if(!pattern.test($(this).val())) {
		$(".error").css("display","block");
		$(".error .error-title").html("手机号码不正确");
	} else {
		$(".error").css("display","none");
		$(".error .error-title").html("");
	}
})
$(".pwd input").on("keyup blur",function() {
	if($(this).val().length<6||$(this).val().length>16) {
		$(".error").css("display","block");
		$(".error .error-title").html("密码长度应为6~16个字符");
	} else if(!(/^[a-zA-Z]\w+$/.test($(this).val()))) {
		$(".error").css("display","block");
			$(".error .error-title").html("非法字符");
	} else {
		$(".error").css("display","none");
		$(".error .error-title").html("");
	}
})
//账号是否注册成功

function registSuccess() {
	$(".regist-btn input").click(function (e) {
		e.preventDefault();
		if ($(".verification a").triggerHandler("click")) {
			saveUsername();
			location.href = "index.html";
		}
		else {
			return false;
		}
	})
}
registSuccess();
//将创建的用户名存到cookie里面在再传入到头部的用户名处
function saveUsername() {
	var userName = $(".tel input").val();
	$.cookie("usrname",userName,{expires:7,path:"/"});
}