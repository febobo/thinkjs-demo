
//iscroll
var myScroll,
	pullUpEl, pullUpOffset,
	generatedCount = 0,page=1;

function pullUpAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		page++;
		ajaxFn("post","/admin/user/list",{'page':page,'limit': 10},function(data){
		console.log(page)
		var data=data.data;
		var allRanking="";
		console.log(data,data.data.length);
		for(var i=0; i<data.data.length; i++){
			allRanking+="<li>";
			allRanking+="<i class='num redFont'>"+((page-1)*10+i+1)+"</i>";
			allRanking+="<img src="+data.data[i].user_avatar+" class='rankMan'>";
			allRanking+="<span class='manName'>"+data.data[i].user_name+"</span>";
			allRanking+="<span class='redFont'>分数："+data.data[i].user_score+"</span>";
			allRanking+="</li>";
		}
		$("#thelist").append(allRanking);
		if(data.data.length==0){
			$(".pullUpLabel").text("暂无排名...");
		}
	});
	myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		onRefresh: function () {
			if(pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '下拉加载更多...';
			}
		},
		onScrollMove: function () {
			if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '下拉加载更多...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '下拉加载更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
