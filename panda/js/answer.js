//回答问题页面

    var total=0;
    $
    function timeFadeIn(box,time,num){
        setTimeout(function(){
            $(box).addClass("fadeIn");
            if($(box).find("input")){
                radioOnly(box,num)
            }
        },time)
    }
    $('input').each(function(){
        $(this).attr('checked' , false)
    })
    timeFadeIn($(".answerBox:eq(1)"),2000);
    timeFadeIn($(".answerBox:eq(2)"),4000,3);
    function radioOnly(fatherBox,num){
        var arr = ["哎哟，不错哦" , "不错啊 再接再厉" , "加油,熊猫妹看好你哟"];
        var radios = $(fatherBox).find("input");
        for(var i=0; i<radios.length; i++){
            var allGrade=$(radios[i]).attr("data-grade");
            total = (function(i){
                radios[i].onclick=function(){
                    $(radios[i]).parent().addClass('on');
                    var curGrade=$(radios[i]).attr("data-grade");
                    if($(radios[i]).is(":checked")){
                        total+=curGrade*1;
                        $(radios[i]).attr("disabled","true").parent().parent().siblings().find("input").attr("disabled","true");
                        if(curGrade=="20"){
                            $(fatherBox).next().find(".session>span").text(arr[Math.floor(Math.random() * (3-1) + 1)]);
                            timeFadeIn($(fatherBox).next(),2000);
                        }else{
                            $(fatherBox).next().find(".session>span").text("你没做功课呀，正确答案是第"+num+"个哦~~");
                            timeFadeIn($(fatherBox).next(),2000);
                        }
                    }
                    if($(fatherBox).next().next().index()==4){
                        timeFadeIn($(fatherBox).next().next(),4000,1);
                    }else{
                        timeFadeIn($(fatherBox).next().next(),4000,1);
                    }
                }
                return total
            })(i)
        }
    }

    var userinfo = JSON.parse(localStorage.getItem('userInfo'));
    if(userinfo){
        var openid = userinfo.user_pass;
    }
    $(".answerBox:eq(6)").tap(function(){
        setTimeout(function() {
            ajaxFn("post","/admin/user/score",{"score" :total , openid : openid},function(data){
                if(data.data.status == 1){
                   window.location.href="http://www.7758a.com:1234/admin/user/userinfo?openid=" + userinfo.user_pass;
                }else if(data.data.status == 100){
                   window.location.href = "grade-page.html?openid=" + openid;
                }else{
                   window.location.href="answer-complete.html?scroe="+total + "&openid=" + userinfo.user_pass;
                }
            })
        }, 3000);

    })













