var ajaxFn=function(type,url,data,successFn,errorFn){
	$.ajax({
		type:type,
		url:'http://192.168.1.111:1234' + url,
		data:data,
		dataType:"json",
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