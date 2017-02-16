//获取无缝轮播所有的数据
var $slideBox = $(".slide-content");
var $liWidth = $(".slide-content li").outerWidth();
console.log($liWidth);
var $firstNode = $(".slide-content li").first().clone(true);
var $lastNode = $(".slide-content li").last().clone(true);
$slideBox.append($firstNode);
$slideBox.prepend($lastNode);
var $len = $(".slide-content li").length;
$slideBox.css("width",$liWidth*$len);
$slideBox.css("left",-$liWidth);
console.log($len);
var iNow = 1;
//获取索引数据；
var $slideIndex = $(".slide-index li");
var index = 0;
var timer = null;
//使用动画
function autoPlay() {
	clearInterval(timer);
	timer = setInterval(function(){
		iNow++;
		if(iNow==$len) {
			iNow = 2;
			$slideBox.css("left",-$liWidth);
		} 
		tab();
	},2000)
}
autoPlay();
// 调节index
function tab() {
	$slideIndex.each(function(index){
		$(this).removeClass();
	})
	if(iNow==$len-1) {
		index = 1;
	} else if (iNow==0) {
		index = $len-3;
	} else {
		index = iNow-1;
	}
	$slideIndex.eq(index).addClass("active");
	$slideBox.animate({"left":-iNow*$liWidth},"slow");
}
$slideBox.hover(function(){
	clearInterval(timer);
},function() {
	autoPlay();
})
$slideIndex.hover(function(){
	clearInterval(timer);
},function() {
	autoPlay();
})
$slideIndex.click(function(){
	index = $(this).index();
	$slideIndex.each(function(index){
		$(this).removeClass();
	});
	$(this).addClass("active");
	iNow = index + 1;
	tab();
})

