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
        let openid = data.openid;
        let model = this.model('user');
        let info = await model.where({
            "user_pass": openid
        }).find();

        await this.session('userInfo' , '131313')

        if (info.user_pass) {
            await this.session('userInfo' , info)
            return this.success({
                userInfo: info
            });
        }
        
        this.success('个人信息获取成功')
    }
    async tjAction() {
        let countModel = await this.model('count');
        let data = await countModel.where({id : 1}).find();
        this.success(data);
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
        let datas = this.post();
        if(!datas.openid){
            return this.success({
                status: 1,
                msg : '还未参与活动'
            })
        }

        let model = this.model("user");
        let user = await model.where({user_pass : datas.openid}).find();
        let data = await model.order({
            user_score: 'desc'
        }).fieldReverse('user_pass').select();
        let scoreIndex, userInfo;
        for (let [k, item] of data.entries()) {
            if (item.id == user.id) {
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
if(new Date() >= new Date('2016','00','22','12','00')){
  return this.success({
    status : 110,
    msg : '亲,活动已经结束了噢'
  })
}

        let data = this.post();
console.log(data)

        let currentUser = await this.session("userInfo");
        let openid = data.openid;;
        if(!openid){
            return this.success({'status' : 1 , msg : '您还未登陆'})
        }
        if(data.openid == data.t_openid){
            return this.success({
                status : 2,
                msg : '不能对自己评分，赶紧分享给好友吧'
            })
        }
        if (!await think.isNumber(data.score * 1)) this.fail('参数不正确');
        let model = this.model('user');
        if (data.type) {
            let commentModel = this.model('comment');
            let isCommnet = await commentModel.where({user_id : data.openid  , t_userid : data.t_openid}).limit(1).find();
            if(isCommnet.user_id){
                return this.success({
                    status : 3,
                    msg : '您已经为他评论过了,帮他分享也是爱噢 '
                })
            }else{
                let user = await commentModel.add({user_id : data.openid  , t_userid : data.t_openid});
            }
            let countModel = await this.model('count');
            //let count = await countModel.add({view_count : 0 , comments_count : 0 , join_count : 0});
            let tj = await countModel.where({id : 1 }).find();
            await countModel.where({id : 1 }).update({comments_count : ++tj.comments_count  });
            let info = await model.where({
                user_pass: data.t_openid
            }).find()
            data.score = (data.score * 1 )  + (info.user_score * 1);
console.log('====================================' + data.t_openid , data.score)
            await model.where({user_pass : data.t_openid}).update({
                    user_score: data.score 
            });;
            
        }else{
            let datas = await model.where({
                user_pass: openid
            }).find();

            if(datas.user_score != 0){
                return this.success({
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
console.log(data)
        let self = this;
        let client = new OAuth('wxa0bb7dd833ca89ce', '45fa8e4a422764b13cd2510b76eeed6b');
        let getAccessToken = think.promisify(client.getAccessToken, client);
        let result = await getAccessToken(data.code);

        let accessToken = result.data.access_token;
        let openid = result.data.openid;

        let getUser = think.promisify(client.getUser, client);
        let userInfo = await getUser(openid);
        console.log(userInfo)

        let model = self.model('user');

        let res = await model.where({
            'user_pass': userInfo.openid
        }).find();
        if (!res.id && userInfo.openid) {

        let countModel = await this.model('count');
        //let count = await countModel.add({view_count : 0 , comments_count : 0 , join_count : 0});
        let tj = await countModel.where({id : 1 }).find();
        await countModel.where({id : 1 }).update({view_count : ++tj.view_count  });
            let insertId = model.add({
                user_name: userInfo.nickname,
                user_pass: userInfo.openid,
                user_avatar: userInfo.headimgurl
            });
        }

        await this.session('userInfo', userInfo);
        let info = await self.session('userInfo');
        if(data.openid){
            this.redirect('http://www.7758a.com/grade-comments.html?userInfo=' + data.openid + '&info=' + info.openid)
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
console.log('=>>>>>>>>>>>>>>>>>>>>' + data)
        if(data.openid){
            url = client.getAuthorizeURL('http://www.7758a.com:1234/admin/user/getcode?openid=' + data.openid , 'state', 'snsapi_userinfo');
        }
        this.redirect(url);
        // this.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f3f09b145491ade&redirect_uri=http://www.7758a.com/&response_type=code&scope=snsapi_base&state=123#wechat_redirect')
        this.success(url)
    }

}


