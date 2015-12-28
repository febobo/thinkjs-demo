"use strict";

import Base from "./base.js";
import OAuth from 'wechat-oauth';


export default class extends Base {
	/**
	 * index action
	 * @return {Promise} []
	 */
	async addAction() {
		let data = this.post();
        let model = this.model('user');

        let info = await this.session('userInfo')
        console.log(info)
		let user_id = await model.add({
			user_name: 'test' + Math.ceil(Math.random() * 100),
			user_pass: 'testpass',
			user_score: Math.ceil(Math.random() * 100),
			user_avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1032584925,2843115905&fm=58'
		})

		let userInfo = await model.where({
			id: user_id
		}).find();

		return this.success({
			userInfo: info
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

		let scoreIndex, userInfo;
		for (let [k, item] of data.entries()) {
			if (item.id == 50) {
				scoreIndex = k + 1;
				userInfo = item;
				break;
			}
		}

		this.success({
			userInfo: userInfo,
			scoreIndex: scoreIndex
		})
	}

	async scoreAction() {
		let data = this.post();
		// let userInfo = await this.session('userInfo');
		// if(!userInfo) this.fail('请先关注');
        if (!await think.isNumber(data.score * 1)) this.fail('参数不正确');
		let model = this.model('user');
		if (data.type) {
			let info = await model.where({
				id: 50
			}).find();
			data.score += info.user_score;
		}
		let datas = await model.where({
			id: 50
		}).update({
			user_score: data.score
		});
		this.success('记分成功')
	}

    async getcodeAction() {
        let data = this.get();
        let self = this;
        let client = new OAuth('wxa0bb7dd833ca89ce', '45fa8e4a422764b13cd2510b76eeed6b');
        let getAccessToken = think.promisify(client.getAccessToken, client);
        let result = await getAccessToken(data.code);

        let accessToken = result.data.access_token;
        let openid = result.data.openid;

        let getUser = think.promisify(client.getUser, client);
        let userInfo = await getUser(openid);

        let model = self.model('user');

        console.log(userInfo)
        let res = model.where({
            'user_pass': userInfo.openid
        }).find();
        if (!res.id) {
            let insertId = model.add({
                user_name: result.nickname,
                user_pass: result.openid,
                user_avatar: result.headimgurl
            });
        }

        await this.session('userInfo', userInfo);
        let info = await self.session('userInfo');
        console.log(info)
        this.redirect('http://www.7758a.com?userInfo=' + info.openid)
        this.success({
            userinfo: userInfo
        })
    }

	async userinfoAction() {
    //    let client = new OAuth('wx9f3f09b145491ade', '88e31eaf4afeadbffae3a34c8363bd6a');
		let client = new OAuth('wxa0bb7dd833ca89ce', '45fa8e4a422764b13cd2510b76eeed6b');
		let url = client.getAuthorizeURL('http://www.7758a.com:1234/admin/user/getcode', 'state', 'snsapi_userinfo');
		this.redirect(url);
		// this.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f3f09b145491ade&redirect_uri=http://www.7758a.com/&response_type=code&scope=snsapi_base&state=123#wechat_redirect')
		this.success(url)
	}

}
