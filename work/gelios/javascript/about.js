$(function(){
  var wid=$('#slide li').width();
  $('#index li').each(function(index,ele){
    $(this).click(function(){
      $(this).addClass('active').siblings().removeClass('active');
      $('#slide ul').animate({left:-index*wid+'px'},'slow');
    });
  });
  $('#left,#right').click(function(){
    $('.content').first().fadeToggle(1000);
    $('.content').last().fadeToggle(1000);
  });
});
