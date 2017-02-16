
    
        $.when($.ajax("data/text.json"))
        .done(function(data){
            
            $.cookie("data1",JSON.stringify(data),{"path":"/"});
        }).fail(function(){console.log("page fail")});
       $.when($.ajax("data/language.json"))
        .done(function(data){
           //将数据存入cookie避免调用时重复加载
           
           $.cookie("data",JSON.stringify(data),{"path":"/"});

            var data = JSON.parse($.cookie("data"));
        
        var data1 = JSON.parse($.cookie("data1"));
        
        var zhen = data[0].zh;
        if(screen&&screen.width<768) {
            var info0 = zhen[0].page1.info[0].replace(/<\/br>/g,"");
                    var info1 = zhen[0].page1.info[1].replace(/<\/br>/g,"");
            $(".page1 h3+p").html(info0);
                $(".page1 p+p").html(info1); 
        }
    $(".box").click(function(){
            
            
            var zh = data[0].zh,en = data[1].en;
            
            var tog = $(".nav li a").html();
            $(".page1 h1").toggleClass("mf");
            $(".page1 h3").toggleClass("PingFang_Light");
        $(".navbar-nav li a,.pdf,.work a,.page1 p,.page3 dt").toggleClass("PF_regular");
            if(tog=="简介") {
                var dataPage2 = data1[1];
                zhen = data[1].en;
                $(".front img").attr("src",zhen[0].page1.nav[3]);
                $(".back img").attr("src",data[0].zh[0].page1.nav[3]);
                
            } else {
                var dataPage2 =data1[0];
                zhen = data[0].zh;
                $(".front img").attr("src",zhen[0].page1.nav[3]);
                $(".back img").attr("src",data[1].en[0].page1.nav[3]);
            
            }
//             切换第二页
                $(".page2 li").each(function(index) {
                    $(this).text(dataPage2.skill[index]);
                });
                $(".page2 h2").each(function(index) {
                    $(this).text(dataPage2.title[index]);
                })
                //更换成英文
                //第一个页面
                $("nav li a").each(function(index){
                    if(index<3) {
                        $(this).html(zhen[0].page1.nav[index]);
                    }
                })
                $(".page1 h3+p").html(zhen[0].page1.info[0]);
                $(".page1 p+p").html(zhen[0].page1.info[1]); 
                if(screen&&screen.width<768) {
                    var info0 = zhen[0].page1.info[0].replace(/<\/br>/g,"");
                    var info1 = zhen[0].page1.info[1].replace(/<\/br>/g,"");
                    $(".page1 h3+p").html(info0);
                    $(".page1 p+p").html(info1); 
                }
                $(".page1 h1").html(zhen[0].page1.name);
                $(".page1 h3 .txt-rotate").html(zhen[0].page1.job);
                
                $(".pdf").html(zhen[0].page1.pdf)
                $(".work a").html(zhen[0].page1.work);
                //第二个页面
                
                //第三个页面
                $("dt").each(function(index) {
                    $(this).html(zhen[0].page3[index]);
                })
            
        })
        

       })
        .fail(function(){console.log("fail loading")});
        
       