var ajaxFn=function(type,url,data,successFn,errorFn){
	$.ajax({
		type:type,
		url:'http://123.56.129.175:1234' + url,
		data:data,
		dataType:"json",
        xhrFields : {withCredentials : true},
		// contentType : 'application/json',
		success:function(data){
			if(data){
				successFn(data);
			}

		},
		error:function(){
			errorFn()
		}
	})
}
