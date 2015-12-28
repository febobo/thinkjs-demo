"use strict";

import Base from "./base.js";
import OAuth from 'wechat-oauth';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async infoAction() {
        let data = this.post();
        let openid = data.openid || 'obdPat4vBB1mFcd9ql_5PtYjRScA';
        let model = this.model('user');
        let info = await model.where({
            "user_pass": openid
        }).find();
        if (info.user_pass) {
            this.session('userInfo' , info)
            return this.success({
                userInfo: info
            });
        }
        this.action('user','/admin/user/userinfo')
        this.success({
            userinfo: userInfo
        })
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

        let currentUser = await this.session("userInfo");
        let openid = currentUser && currentUser.user_pass;
        if(!currentUser){
            this.success({'status' : 1 , msg : '您还未登陆'})
        }

        if (!await think.isNumber(data.score * 1)) this.fail('参数不正确');
        let model = this.model('user');
        if (data.type) {
            let info = await model.where({
                user_pass: openid
            }).find();
            data.score += info.user_score;
        }else{
            let datas = await model.where({
                user_pass: openid
            })
            if(datas.user_pass != 0){
                this.success({
                    status : 100,
                    msg : '您已经答过题了,快去分享给好友评分吧'
                })
            }else{
                await model.where({
                    user_pass: openid
                }).update({
                    user_score: data.score
                });
            }
        }
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
        if(data.openid){
            this.redirect('http://www.7758a.com/grade-comments.html?userInfo=' + info.openid)
        }else{
            this.redirect('http://www.7758a.com?userInfo=' + info.openid)
        }
        this.success({
            userinfo: userInfo
        })
    }

    async userinfoAction() {
        //    let client = new OAuth('wx9f3f09b145491ade', '88e31eaf4afeadbffae3a34c8363bd6a');
        let client = new OAuth('wxa0bb7dd833ca89ce', '45fa8e4a422764b13cd2510b76eeed6b');
        let url = client.getAuthorizeURL('http://www.7758a.com:1234/admin/user/getcode', 'state', 'snsapi_userinfo');
        let data = this.get();
        if(data.openid){
            url = client.getAuthorizeURL('http://www.7758a.com:1234/admin/user/getcode?openid=' + data.openid , 'state', 'snsapi_userinfo');
        }
        this.redirect(url);
        // this.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f3f09b145491ade&redirect_uri=http://www.7758a.com/&response_type=code&scope=snsapi_base&state=123#wechat_redirect')
        this.success(url)
    }

}
