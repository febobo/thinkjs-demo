"use strict";var _inherits = require("babel-runtime/helpers/inherits")["default"];var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];exports.__esModule = true;var _baseJs = require(

"./base.js");var _baseJs2 = _interopRequireDefault(_baseJs);var _wechatOauth = require(
'wechat-oauth');var _wechatOauth2 = _interopRequireDefault(_wechatOauth);var _default = (function (_Base) {_inherits(_default, _Base);function _default() {_classCallCheck(this, _default);_Base.apply(this, arguments);}


    /**
     * index action
     * @return {Promise} []
     */_default.prototype.
    infoAction = function infoAction() {var 
        data, 
        openid, 
        model, 
        info;return _regeneratorRuntime.async(function infoAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:data = this.post();openid = data.openid;model = this.model('user');context$2$0.next = 5;return _regeneratorRuntime.awrap(model.where({ 
                        "user_pass": openid }).
                    find());case 5:info = context$2$0.sent;context$2$0.next = 8;return _regeneratorRuntime.awrap(

                    this.session('userInfo', '131313'));case 8:if (!

                    info.user_pass) {context$2$0.next = 12;break;}context$2$0.next = 11;return _regeneratorRuntime.awrap(
                    this.session('userInfo', info));case 11:return context$2$0.abrupt("return", 
                    this.success({ 
                        userInfo: info }));case 12:



                    this.success('个人信息获取成功');case 13:case "end":return context$2$0.stop();}}, null, this);};_default.prototype.

    tjAction = function tjAction() {var 
        countModel, 
        data;return _regeneratorRuntime.async(function tjAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:context$2$0.next = 2;return _regeneratorRuntime.awrap(this.model('count'));case 2:countModel = context$2$0.sent;context$2$0.next = 5;return _regeneratorRuntime.awrap(countModel.where({ id: 1 }).find());case 5:data = context$2$0.sent;
                    this.success(data);case 7:case "end":return context$2$0.stop();}}, null, this);};_default.prototype.


    listAction = function listAction() {var 
        data, 
        page, 
        limit, 
        model, 
        result, 


        count;return _regeneratorRuntime.async(function listAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:data = this.post();page = data.page || 1;limit = data.limit || 10;model = this.model("user");context$2$0.next = 6;return _regeneratorRuntime.awrap(model.order({ user_score: 'desc' }).fieldReverse('user_pass').page(page, limit).select());case 6:result = context$2$0.sent;context$2$0.next = 9;return _regeneratorRuntime.awrap(model.count());case 9:count = context$2$0.sent;return context$2$0.abrupt("return", 

                    this.success({ 
                        total: count, 
                        data: result }));case 11:case "end":return context$2$0.stop();}}, null, this);};_default.prototype.



    myresultAction = function myresultAction() {var 
        datas, 







        model, 
        user, 
        data, 


        scoreIndex, userInfo, _iterator, _isArray, _i, _ref, 
        k, item;return _regeneratorRuntime.async(function myresultAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:datas = this.post();if (datas.openid) {context$2$0.next = 3;break;}return context$2$0.abrupt("return", this.success({ status: 1, msg: '还未参与活动' }));case 3:model = this.model("user");context$2$0.next = 6;return _regeneratorRuntime.awrap(model.where({ user_pass: datas.openid }).find());case 6:user = context$2$0.sent;context$2$0.next = 9;return _regeneratorRuntime.awrap(model.order({ user_score: 'desc' }).fieldReverse('user_pass').select());case 9:data = context$2$0.sent;scoreIndex = undefined, userInfo = undefined;_iterator = data.entries(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);case 12:if (!_isArray) {context$2$0.next = 18;break;}if (!(_i >= _iterator.length)) {context$2$0.next = 15;break;}return context$2$0.abrupt("break", 30);case 15:_ref = _iterator[_i++];context$2$0.next = 22;break;case 18:_i = _iterator.next();if (!_i.done) {context$2$0.next = 21;break;}return context$2$0.abrupt("break", 30);case 21:_ref = _i.value;case 22:k = _ref[0];item = _ref[1];if (!(
                    item.id == user.id)) {context$2$0.next = 28;break;}
                    scoreIndex = k + 1;
                    userInfo = item;return context$2$0.abrupt("break", 30);case 28:context$2$0.next = 12;break;case 30:




                    this.success({ 
                        userInfo: userInfo, 
                        scoreIndex: scoreIndex });case 31:case "end":return context$2$0.stop();}}, null, this);};_default.prototype.



    scoreAction = function scoreAction() {var 







        data, 


        currentUser, 
        openid, 










        model, 

        commentModel, 
        isCommnet, 






        user, 

        countModel, 

        tj, 

        info, 









        datas;return _regeneratorRuntime.async(function scoreAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:if (!(new Date() >= new Date('2016', '00', '22', '12', '00'))) {context$2$0.next = 2;break;}return context$2$0.abrupt("return", this.success({ status: 110, msg: '亲,活动已经结束了噢' }));case 2:data = this.post();console.log(data);context$2$0.next = 6;return _regeneratorRuntime.awrap(this.session("userInfo"));case 6:currentUser = context$2$0.sent;openid = data.openid;;if (openid) {context$2$0.next = 11;break;}return context$2$0.abrupt("return", this.success({ 'status': 1, msg: '您还未登陆' }));case 11:if (!(data.openid == data.t_openid)) {context$2$0.next = 13;break;}return context$2$0.abrupt("return", this.success({ status: 2, msg: '不能对自己评分，赶紧分享给好友吧' }));case 13:context$2$0.next = 15;return _regeneratorRuntime.awrap(think.isNumber(data.score * 1));case 15:if (context$2$0.sent) {context$2$0.next = 17;break;}this.fail('参数不正确');case 17:model = this.model('user');if (!data.type) {context$2$0.next = 48;break;}commentModel = this.model('comment');context$2$0.next = 22;return _regeneratorRuntime.awrap(commentModel.where({ user_id: data.openid, t_userid: data.t_openid }).limit(1).find());case 22:isCommnet = context$2$0.sent;if (!isCommnet.user_id) {context$2$0.next = 27;break;}return context$2$0.abrupt("return", this.success({ status: 3, msg: '您已经为他评论过了,帮他分享也是爱噢 ' }));case 27:context$2$0.next = 29;return _regeneratorRuntime.awrap(commentModel.add({ user_id: data.openid, t_userid: data.t_openid }));case 29:user = context$2$0.sent;case 30:context$2$0.next = 32;return _regeneratorRuntime.awrap(this.model('count'));case 32:countModel = context$2$0.sent;context$2$0.next = 35;return _regeneratorRuntime.awrap(countModel.where({ id: 1 }).find());case 35:tj = context$2$0.sent;context$2$0.next = 38;return _regeneratorRuntime.awrap(countModel.where({ id: 1 }).update({ comments_count: ++tj.comments_count }));case 38:context$2$0.next = 40;return _regeneratorRuntime.awrap(model.where({ user_pass: data.t_openid }).find());case 40:info = context$2$0.sent;data.score = data.score * 1 + info.user_score * 1;console.log('====================================' + data.t_openid, data.score);context$2$0.next = 45;return _regeneratorRuntime.awrap(model.where({ user_pass: data.t_openid }).update({ user_score: data.score }));case 45:;context$2$0.next = 57;break;case 48:context$2$0.next = 50;return _regeneratorRuntime.awrap(model.where({ 
                        user_pass: openid }).
                    find());case 50:datas = context$2$0.sent;if (!(

                    datas.user_score != 0)) {context$2$0.next = 55;break;}return context$2$0.abrupt("return", 
                    this.success({ 
                        status: 100, 
                        msg: '您已经答过题了,快去分享给好友评分吧' }));case 55:context$2$0.next = 57;return _regeneratorRuntime.awrap(


                    model.where({ 
                        user_pass: openid }).
                    update({ 
                        user_score: data.score }));case 57:



                    this.success('记分成功');case 58:case "end":return context$2$0.stop();}}, null, this);};_default.prototype.


    getcodeAction = function getcodeAction() {var 
        data, 

        self, 
        client, 
        getAccessToken, 
        result, 

        accessToken, 
        openid, 

        getUser, 
        userInfo, 


        model, 

        res, 




        countModel, 

        tj, 

        insertId, 







        info;return _regeneratorRuntime.async(function getcodeAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:data = this.get();console.log(data);self = this;client = new _wechatOauth2["default"]('wxa0bb7dd833ca89ce', '45fa8e4a422764b13cd2510b76eeed6b');getAccessToken = think.promisify(client.getAccessToken, client);context$2$0.next = 7;return _regeneratorRuntime.awrap(getAccessToken(data.code));case 7:result = context$2$0.sent;accessToken = result.data.access_token;openid = result.data.openid;getUser = think.promisify(client.getUser, client);context$2$0.next = 13;return _regeneratorRuntime.awrap(getUser(openid));case 13:userInfo = context$2$0.sent;console.log(userInfo);model = self.model('user');context$2$0.next = 18;return _regeneratorRuntime.awrap(model.where({ 'user_pass': userInfo.openid }).find());case 18:res = context$2$0.sent;if (!(!res.id && userInfo.openid)) {context$2$0.next = 29;break;}context$2$0.next = 22;return _regeneratorRuntime.awrap(this.model('count'));case 22:countModel = context$2$0.sent;context$2$0.next = 25;return _regeneratorRuntime.awrap(countModel.where({ id: 1 }).find());case 25:tj = context$2$0.sent;context$2$0.next = 28;return _regeneratorRuntime.awrap(countModel.where({ id: 1 }).update({ view_count: ++tj.view_count }));case 28:insertId = model.add({ user_name: userInfo.nickname, user_pass: userInfo.openid, user_avatar: userInfo.headimgurl });case 29:context$2$0.next = 31;return _regeneratorRuntime.awrap(this.session('userInfo', userInfo));case 31:context$2$0.next = 33;return _regeneratorRuntime.awrap(self.session('userInfo'));case 33:info = context$2$0.sent;
                    if (data.openid) {
                        this.redirect('http://www.7758a.com/grade-comments.html?userInfo=' + data.openid + '&info=' + info.openid);} else 
                    {
                        this.redirect('http://www.7758a.com?userInfo=' + info.openid);}

                    this.success({ 
                        userinfo: userInfo });case 36:case "end":return context$2$0.stop();}}, null, this);};_default.prototype.



    userinfoAction = function userinfoAction() {var 

        client, 
        url, 
        data;return _regeneratorRuntime.async(function userinfoAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:client = new _wechatOauth2["default"]('wxa0bb7dd833ca89ce', '45fa8e4a422764b13cd2510b76eeed6b');url = client.getAuthorizeURL('http://www.7758a.com:1234/admin/user/getcode', 'state', 'snsapi_userinfo');data = this.get();
                    console.log('=>>>>>>>>>>>>>>>>>>>>' + data);
                    if (data.openid) {
                        url = client.getAuthorizeURL('http://www.7758a.com:1234/admin/user/getcode?openid=' + data.openid, 'state', 'snsapi_userinfo');}

                    this.redirect(url);
                    // this.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f3f09b145491ade&redirect_uri=http://www.7758a.com/&response_type=code&scope=snsapi_base&state=123#wechat_redirect')
                    this.success(url);case 7:case "end":return context$2$0.stop();}}, null, this);};return _default;})(_baseJs2["default"]);exports["default"] = _default;module.exports = exports["default"]; //let count = await countModel.add({view_count : 0 , comments_count : 0 , join_count : 0});
//let count = await countModel.add({view_count : 0 , comments_count : 0 , join_count : 0});
//    let client = new OAuth('wx9f3f09b145491ade', '88e31eaf4afeadbffae3a34c8363bd6a');