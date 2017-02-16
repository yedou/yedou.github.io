window.onload=function() {
  var top=document.getElementById('top');
  var cH=document.documentElement.clientHeight;
  var bl=true;
  var timer=null;
  var photo0=document.getElementsByClassName('photo')[0];
  var lis0=photo0.getElementsByTagName('li');
  var photo1=document.getElementsByClassName('photo')[1];
  var lis1=photo1.getElementsByTagName('li');
  for (var i = 0; i < lis0.length; i++) {
    lis0[i].onmouseover=function() {
      for (var  j= 0; j < lis0.length; j++) {
        lis0[j].className='';
      }
      this.className='active';
    }
    lis0[i].onmouseout=function() {
      this.className='';
    }
  }
  for (var i = 0; i < lis1.length; i++) {
    lis1[i].onmouseover=function() {
      for (var  j= 0; j < lis1.length; j++) {
        lis1[j].className='';
      }
      this.className='active';
    }
    lis1[i].onmouseout=function() {
      this.className='';
    }
  }

  window.onscroll=function(){
    var cT=document.documentElement.scrollTop||document.body.scrollTop;
    if(cT>=cH){
      top.style.display="block";
    }
    else{
      top.style.display="none";
    }
    if(!bl){
      clearInterval(timer);
    }
    console.log("2");
    bl=false;
  }
  top.onclick=function(){
    timer=setInterval(function(){
      var cT=document.documentElement.scrollTop||document.body.scrollTop;
      var speed=Math.floor(-cT/6);
      document.documentElement.scrollTop=document.body.scrollTop=cT+speed;
      console.log("1");
      bl=true;
      if(cT==0){
        clearInterval(timer);
      }
    },30)
  }
}
