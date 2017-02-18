
		
		if(screen&&screen.width>768) {
            	// 页面切换效果
			var $wrap = $("#wrap"),$pages = $(".section");
			$pages.width($wrap.outerWidth(true)/3);
			var $w = $pages.outerWidth(true);
			var $lis = $(".listItem");
			var $iNow = 0;
			var $preIndex = 0;
			var $index = 0;
			var line = null;
			$lis.click(function(){
                
				$index=$(this).index();
				if($index==3){return false};
				if($index-$preIndex>0) {
					if($preIndex==0) {
					var line="line"+($index)+" .8s forwards";
					}
					if($preIndex==1) {
						var line="line"+(2)+" .8s forwards";
					}
					if($preIndex==0&&$index==2) {
						var line="line"+(3)+" .8s forwards";
					}
				}
				if($index-$preIndex<=0) {
					if($preIndex==2&&$index==1) {
					var line="line"+"01"+" .8s forwards";
					}
					if($preIndex==2&&$index==0) {
					var line="line"+"02"+" .8s forwards";
					}
					if($preIndex==1&&$index==0) {
					var line="line"+"00"+" .8s forwards";
					}
				}
				if($preIndex==0) {
					setTimeout(function() {
						$(".active-line").css("animation",line);
						$wrap.stop().animate({left:-$index*$w},600,"easeInOutQuart");
					},600)
				} else {
						$(".active-line").css("animation",line);
						$wrap.stop().animate({left:-$index*$w},600,"easeInOutQuart");
				}
				if($index==3){
					$index = 2;
				}
				// $(".active-line").css("animation",line);
				// $wrap.stop().animate({left:-$index*$w},600);
				$preIndex = $index;
				work();
			});
			function work() {
				if($index==0) {
					setTimeout(function() {
						$(".work").stop().animate({opacity:1},600,"easeInOutQuart");
					},600)
				}else{
					
						$(".work").stop().animate({opacity:0},600,"easeInOutQuart");
					
				}
			}
			// 封装的鼠标滚轮事件
			// 考虑兼容性
			// chrome,ff使用的是addEventListener添加事件
			// ie使用的是attachEvent添加事件
			// chrome,ie鼠标滚轮用wheelDeltal检测 onmousewheel 正值是向上滚动
			// ff用detail检测 DOMMouseScroll 正值是向下滚动
			// 封装函数
			// addEventListener("mousewheel",fn,false)
			// attachEvent("onmousewheel",fn)
			function addEvent(obj,mEvent,fn) {
				if(obj.attachEvent) {
					obj.attachEvent("on"+mEvent,fn);
				} else {
					obj.addEventListener(mEvent,fn,false);
				}
			}
			var wheelNum = 0;
			addEvent(window,"mousewheel",slide);
			addEvent(window,"DOMMouseScroll",slide);
			function slide(e) {
				var e = e || window.event;
                e.preventDefault();
				wheelNum++;
				if(wheelNum%5==4) {
						//向下滚动
                        
						var down = true;
						down = e.wheelDelta?e.wheelDelta<0:e.detail>0;
						if(down) {
								$index++;
								if($index>=3) {
									$index = 2;
								}
                                console.log($index);
							if($index==1) {
								$(".work").animate({"opacity":0},600,function() {
									var line="line"+($index)+" .8s forwards";
									$(".active-line").css("animation",line);
									$wrap.stop().animate({left:-$index*$w},600,"easeInOutQuart");
								})
							} else {
								
								var line="line"+($index)+" .8s forwards";
									$(".active-line").css("animation",line);
									$wrap.stop().animate({left:-$index*$w},600,"easeInOutQuart");
							}
							
						}
						//向上滚动
						var up = true;
						up = e.wheelDelta?e.wheelDelta>0:e.detail<0;
						if(up) {
							$index--;
							if($index==-1) {
								$index = 0;
								return false;
							}
                            console.log($index);
							var line="line0"+($index)+" .8s forwards";
							$(".active-line").css("animation",line);
							$wrap.stop().animate({left:-$index*$w},600,"easeInOutQuart");
							if($index==0) {
								$(".active-line").css("animation",line);
								$wrap.stop().animate({left:-$index*$w},600,"easeInOutQuart",function(){
									$(".work").animate({"opacity":1},600,"easeInOutQuart");
								});
							}
						}
				}
				
				$preIndex = $index;
			}
			$(".work a").click(function() {
				$(".work").stop().animate({opacity:0},600);
				setTimeout(function() {
					$index = 1;
					$preIndex =1;
					var line="line"+($index)+" .6s forwards";
					$(".active-line").css("animation",line);
					$wrap.stop().animate({left:-$index*$w},600,"easeInOutQuart");
				},600);
			});
            //点击logo回到起始页面
            $(".navbar-brand").click(function() {
                if($index==1) {
                    line="line00 .8s forwards";
                    $(".active-line").css("animation",line);
								$wrap.stop().animate({left:0*$w},600,"easeInOutQuart",function(){
									$(".work").animate({"opacity":1},600,"easeInOutQuart");
								});
                    $index=0;$preIndex=0;
                }
                if($index==2) {
                   line="line02 .8s forwards";
                    $(".active-line").css("animation",line);
								$wrap.stop().animate({left:0*$w},600,function(){
									$(".work").animate({"opacity":1},600,"easeInOutQuart");
								});
                    $index=0;$preIndex=0;                     
                }
            })
            
        } else {
            
            $(".navbar-nav li a").attr("data-toggle","collapse");
            $(".listItem a").each(function(index){
                $(this).click(function(e) {
                    e.preventDefault();
                    var curTop = $(".section").eq(index).offset().top-150;
                    $("html,body").animate({scrollTop:curTop},600);
                })
            })
        }
			
			
			//头像apple tv效果
			if(screen&&screen.width>768) {
				var $avatar = $(".avatar"),$shine = $(".shine"),$layer = $(".layer-1");
			$(".page3").on("mousemove",function(e) {
				var w = $(e.currentTarget).innerWidth(),h = $(e.currentTarget).innerHeight();
				var offsetX = 0.5 - e.pageX/w,offsetY = 0.5 - e.pageY/h,
					offsetAvatar = $avatar.data("offset"),
					transformAvatar = 'translateY(' + -offsetX * offsetAvatar + 'px) rotateX(' + (-offsetY * offsetAvatar) + 'deg) rotateY(' + (offsetX * (offsetAvatar * 2)) + 'deg)';
				$avatar.css("transform",transformAvatar);
				var offsetLayer = $layer.data("offset");
				var transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';
				$layer.css("transform",transformLayer);
				//改变光标是产生反光效果
				dy = e.pageY - h / 2,
        		dx = e.pageX - w / 2,
        		theta = Math.atan2(dy,dx), 
        		angle = theta * 180 / Math.PI;
        		if (angle < 0) {
    				angle = angle + 360;
				}
				$shine.css('background', 'linear-gradient(' + (angle - 90) + 'deg, rgba(255,255,255,' + e.pageY / h + ') 0%,rgba(255,255,255,0) 80%)');
			});
			}
			// 中英文切换
			// $(".box").click(function() {
			// 	$(this).toggleClass("flip");
			// });
			$(".box").hover(function(){
				$(this).toggleClass("flip");
			})
            
		  
	