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
	timeFadeIn($(".answerBox:eq(2)"),1000,1);
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
						timeFadeIn($(fatherBox).next().next(),2000,2);
					}else{
						timeFadeIn($(fatherBox).next().next(),2000,3);
						
					}
				}
				return total
			})(i)
		}
	}

	$(".answerBox:eq(6)").tap(function(){
		ajaxFn("post","/admin/user/score",{"score" :total},function(data){
			window.location.href="answer-complete.html?scroe="+total;
		})
	})











