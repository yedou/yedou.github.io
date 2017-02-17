var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
 
  this.el = el;
  this.last = this.toRotate.length-1;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 200;
  }
  if (this.txt==this.toRotate[this.last]) {
      $(".typing").css("animation","none");
      return false;
      
  }
  timer=setTimeout(function() {
    that.tick();
  }, delta);
};


    var toggle = false;
 $(".navbar-toggle").click(function() {
     
    if(toggle) {
        
        
        toggle =false;
    } else {
        $(".navbar-header").css("borderBottomColor","#fff");
        $(".navbar-collapse").css("borderTopColor","#fff");
        toggle = true;
        console.log(2);
    }
 })
  function typing() {
      var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('rotate').split(",");
      
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], toRotate, period);
    }
  }
  }
    
    var turndown = true;
    $(".box").click(function() {
        clearTimeout(timer);
        $(".typing").css("animation","typing 0.4s infinite");
        
        if(turndown) {
            $(".txt-rotate").attr("rotate","front-end engineer,self-learner,perfectionism,Enjoy all the new things,Frontend Developer");
            turndown = false;
        } else {
            $(".txt-rotate").attr("rotate","前端工程师,自学者,完美主义,热爱一切新事物,前端开发工程师");
            turndown = true;
        }
        setTimeout(typing,1000);
        
    })
