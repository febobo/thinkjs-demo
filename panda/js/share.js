
$.ajax({
    type:'post',
    url:'http://123.56.129.175:1234/admin/sdk/sdkconfig',
    data:'',
    dataType:"json",
    xhrFields : {withCredentials : true},
    // contentType : 'application/json',
    success:function(data){
    var r = data.data;
    // 配置微信JS-SDK
    wx.config({
        debug: false,
        appId: r.appId,
        timestamp: r.timestamp,
        nonceStr: r.nonceStr,
        signature: r.signature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'chooseImage'
        ]
    });
        // 调用微信API
    wx.ready(function() {
        var urlVal=window.location.search;
        if(location.href.indexOf('complete') >= 0){
            openid = location.href.split("?")[1].split("=")[2]
        }else{
            openid=urlVal.split("?")[1].split("=")[1];
        }
        var sdata = {
            title: '熊猫妹送6s啦',
            desc: '急急急!!小伙伴们快来帮我评分啦',
            link: 'http://www.7758a.com/grade-comments.html?openid=' + openid ,
            imgUrl : 'http://www.7758a.com/img/activity.png',
            success: function() {
                window.location.href = "http://www.7758a.com/grade-page.html"
            },
            cancel: function() {
            }
        };
        if(location.href.indexOf('comment') >= 0){
            sdata.link = location.href;
        }
        wx.onMenuShareTimeline(sdata);
        wx.onMenuShareAppMessage(sdata);
    });

    },
    error:function(){
        errorFn()
    }
})

