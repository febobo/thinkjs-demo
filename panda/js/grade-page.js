//获取排名
$(function(){
    var user = JSON.parse(localStorage.getItem('userInfo'));
    var openid;
    if(user){
        openid = user.user_pass;
    }
	//获取全部排名
	var page=1;//当前页;
	ajaxFn("post","/admin/user/list",{'page': 1,'limit': 10},function(data){
		var data=data.data
		var allRanking="";
		for(var i=0; i<data.data.length; i++){
			allRanking+="<li>";
			allRanking+="<i class='num redFont'>"+((page-1)*10+i+1)+"</i>";
			allRanking+="<img src="+data.data[i].user_avatar+" class='rankMan'>";
			allRanking+="<span class='manName'>"+data.data[i].user_name+"</span>";
			allRanking+="<span class='redFont'>分数："+data.data[i].user_score+"</span>";
			allRanking+="</li>";
		}
		$("#thelist").append(allRanking);
	})

	//获取我的排名
	$(".myRanking").tap(function(){
		ajaxFn("post","/admin/user/myresult",{openid : openid},function(data){
            if(data.data.status == 100){

			$('.popUp').empty();
			var noName="<span>您还没有参加活动，快点来参加吧！</span><input type='button' value='我也要拿6S' class='joinBtn'>"
			$('.popUp').append(noName);
			$("#mask1").show();

            }else{

			var data=data.data;
			var curRanking="";
			curRanking="<i class='redFont'>第"+data.scoreIndex+"名&nbsp;&nbsp;&nbsp;"+data.userInfo.user_score+"分</i>"
			$('.popUp .myScore').append(curRanking);
			$("#mask1").show();

            }
		},function(){
		})
	})
	//规则页面关注按钮展开扫描二维码
	$(".attention").tap(function(){
		$("#mask2").show();
	});
	
	$(".award").tap(function(){
		$("#mask2").show();
	});
	//获取我的排名点击关闭按钮重置
	$(".close").tap(function(){
		$("#mask2").hide();
		$("#mask1").hide();
		$('.popUp .myScore').text("");
	})

	//您还没有参加活动，快点来参加吧点击我也要领取6s
	$(".popUp").on("tap",".joinBtn",function(){
		alert("暂时不知道要走哪一步");
	})
	
})










