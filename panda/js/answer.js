//回答问题页面

	var total=0;
	function timeFadeIn(box,time,num){
		setTimeout(function(){
			$(box).addClass("fadeIn");
			if($(box).find("input")){
				radioOnly(box,num)
			}
		},time)
	}
	timeFadeIn($(".answerBox:eq(1)"),500);
	timeFadeIn($(".answerBox:eq(2)"),1000,3);
	function radioOnly(fatherBox,num){
		var radios = $(fatherBox).find("input");
		for(var i=0; i<radios.length; i++){
			var allGrade=$(radios[i]).attr("data-grade");
			total = (function(i){
				radios[i].onclick=function(){
					var curGrade=$(radios[i]).attr("data-grade");
					if($(radios[i]).is(":checked")){
						total+=curGrade*1;
						$(radios[i]).attr("disabled","true").parent().siblings().find("input").attr("disabled","true");
						if(curGrade=="20"){
							$(fatherBox).next().find(".session>span").text("哎哟，不错哦");
							timeFadeIn($(fatherBox).next(),1000);
						}else{
							$(fatherBox).next().find(".session>span").text("你没做功课呀，正确答案是第"+num+"个哦~~");
							timeFadeIn($(fatherBox).next(),1000);
						}
					}
					if($(fatherBox).next().next().index()==4){
						timeFadeIn($(fatherBox).next().next(),2000,1);
					}else{
						timeFadeIn($(fatherBox).next().next(),2000,1);
					}
				}
				return total
			})(i)
		}
	}

    var userinfo;
	$(".answerBox:eq(6)").tap(function(){
		ajaxFn("post","/admin/user/score",{"score" :total},function(data){
            if(data.data.status == 1){
		       window.location.href="http://www.7758a.com:1234/admin/user/userinfo?openid=" + userinfo.user_pass;
            }else if(data.data.status == 100){
               alert('您已经答过题，快去分享给好友评分吧')
            }else{
		       window.location.href="answer-complete.html?scroe="+total + "&openid=" + userinfo.user_pass;
            }
		})
	})
    ajaxFn("post","/admin/user/info",{"score" :total},function(data){
        console.log(data.data.userInfo)
        if(data && data.data){
            userinfo = data.data.userInfo;
            localStorage.setItem('userInfo' , JSON.stringify(data.data.userInfo));
        }
	})












