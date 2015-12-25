//
//获取全部排名
//请求地址 youhost/admin/user/list
//请求类型 post 
* 参数demo {
	"page": 1,
	"limit": 10
}
//请求参数 
* page 当前页
* limit 一页多少条
//返回例子 
返回字段说明
total 为总条数
data 为列表
t
	{
		"errno": 0 ,
		"errmsg": "",
		"data": {
			"total": 92 ,
			"data": [{
				"id": 37 "user_name": "test70"
				"user_avatar": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1032584925,2843115905&fm=58"
				"user_score": 143
			}]-	-
		} -
	}


//
//获取我的排名
//请求地址 youhost/admin/user/myresult
//请求类型 post
//请求参数 无
//返回例子 
返回字段说明
userInfo为当前用户信息
scoreIndex 为当前用户排名 
{
	"errno": 0 "errmsg": ""
	"data": {
		"userInfo": {
			"id": 50 "user_name": "test12"
			"user_avatar": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1032584925,2843115905&fm=58"
			"user_score": 143
		} -
		"scoreIndex": 2
	} -
}

//
//提交问题分数
//请求地址 youhost/admin/user/score
//请求类型 post
//请求参数 
demo {"score" : 1 , "type" : 1}
参数解释 score 为分数  ， type 可不传 ， 不传为答题分数， type 为1等于评论加分
//返回例子 
{
"errno": 0
"errmsg": ""
"data": "记分成功"
}
