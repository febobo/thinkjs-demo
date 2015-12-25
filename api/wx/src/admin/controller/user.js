"use strict";

import Base from "./base.js";

export default class extends Base {
	/**
	 * index action
	 * @return {Promise} []
	 */
	async addAction() {
		console.log(this.post('currentPage'))
		let data = this.post();
		let user_id = await model.add({
			user_name: 'test' + Math.ceil(Math.random() * 100),
			user_pass: 'testpass',
			user_score: Math.ceil(Math.random() * 100),
			user_avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1032584925,2843115905&fm=58'
		})
		
		let userInfo = await model.where({
			id: user_id
		}).find();
		
		await this.session(userInfo, userInfo);
		return this.success({
			userInfo: userInfo
		});
	}

	async listAction() {
		let data = this.post();
		let page = data.page || 1;
		let limit = data.limit || 10;
		let model = this.model("user");
		let result = await model.order({
			user_score: 'desc'
		}).fieldReverse('user_pass').page(page, limit).select();
		let count = await model.count();

		return this.success({
			total: count,
			data: result
		});
	}

	async myresultAction() {
		let model = this.model("user");
		let data = await model.order({
			user_score: 'desc'
		}).fieldReverse('user_pass').select();

		let scoreIndex , userInfo;
		for (let [k , item ] of data.entries()){
			console.log(k , item)
			if(item.id == 50){
				scoreIndex = k + 1;
				userInfo = item;
				break;
			}
		}

		this.success({
			userInfo: userInfo,
			scoreIndex : scoreIndex
		})
	}

	async scoreAction (){
		let data = this.post();
		let userInfo = await this.session('userInfo');
		console.log('userInfo' , userInfo);
		// if(!userInfo) this.fail('请先关注');
		if(!await think.isNumber(data.score)) this.fail('参数不正确');
		let model = this.model('user');
		if(data.type){
			let info = await model.where({id : 50}).find();
			data.score += info.user_score;
		}
		let datas = await model.where({id : 50}).update({user_score : data.score});
		this.success('记分成功')
	}
}