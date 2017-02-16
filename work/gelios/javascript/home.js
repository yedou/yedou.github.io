$(function(){
  var timer=null;
  var index=0;
  $('#left,#right').click(function(){
    $('.content').first().fadeToggle(1000);
    $('.content').last().fadeToggle(1000);
  });
$('.photo li').hover(function(){
  $(this).addClass('active').siblings().removeClass('active');
},function(){
  $(this).removeClass('active');
});
timer=setInterval(function(){
  index++;
  var w=$('.photo li img').width();
  $('.photo ul').animate({left:-index*w+'px'},2000);
  if(index==5) {index=0;}
  console.log(index);
},5000);
});
