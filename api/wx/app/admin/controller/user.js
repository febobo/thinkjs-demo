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
		info;return _regeneratorRuntime.async(function infoAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:data = this.post();openid = data.openid || 'obdPat4vBB1mFcd9ql_5PtYjRScA';model = this.model('user');context$2$0.next = 5;return _regeneratorRuntime.awrap(model.where({ 
						"user_pass": openid }).
					find());case 5:info = context$2$0.sent;if (!
					info.user_pass) {context$2$0.next = 9;break;}
					this.session('userInfo', info);return context$2$0.abrupt("return", 
					this.success({ 
						userInfo: info }));case 9:


					this.redirect('http://www.7758a.com:1234/admin/user/userinfo');
					this.success({ 
						userinfo: userInfo });case 11:case "end":return context$2$0.stop();}}, null, this);};_default.prototype.



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
		model, 
		data, 



		scoreIndex, userInfo, _iterator, _isArray, _i, _ref, 
		k, item;return _regeneratorRuntime.async(function myresultAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:model = this.model("user");context$2$0.next = 3;return _regeneratorRuntime.awrap(model.order({ user_score: 'desc' }).fieldReverse('user_pass').select());case 3:data = context$2$0.sent;scoreIndex = undefined, userInfo = undefined;_iterator = data.entries(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);case 6:if (!_isArray) {context$2$0.next = 12;break;}if (!(_i >= _iterator.length)) {context$2$0.next = 9;break;}return context$2$0.abrupt("break", 24);case 9:_ref = _iterator[_i++];context$2$0.next = 16;break;case 12:_i = _iterator.next();if (!_i.done) {context$2$0.next = 15;break;}return context$2$0.abrupt("break", 24);case 15:_ref = _i.value;case 16:k = _ref[0];item = _ref[1];if (!(
					item.id == 50)) {context$2$0.next = 22;break;}
					scoreIndex = k + 1;
					userInfo = item;return context$2$0.abrupt("break", 24);case 22:context$2$0.next = 6;break;case 24:




					this.success({ 
						userInfo: userInfo, 
						scoreIndex: scoreIndex });case 25:case "end":return context$2$0.stop();}}, null, this);};_default.prototype.



	scoreAction = function scoreAction() {var 
		data, 



		model, 

		info, 




		datas;return _regeneratorRuntime.async(function scoreAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:data = this.post();context$2$0.next = 3;return _regeneratorRuntime.awrap(think.isNumber(data.score * 1));case 3:if (context$2$0.sent) {context$2$0.next = 5;break;}this.fail('参数不正确');case 5:model = this.model('user');if (!data.type) {context$2$0.next = 11;break;}context$2$0.next = 9;return _regeneratorRuntime.awrap(model.where({ id: 50 }).find());case 9:info = context$2$0.sent;data.score += info.user_score;case 11:context$2$0.next = 13;return _regeneratorRuntime.awrap(model.where({ 
						id: 50 }).
					update({ 
						user_score: data.score }));case 13:datas = context$2$0.sent;

					this.success('记分成功');case 15:case "end":return context$2$0.stop();}}, null, this);};_default.prototype.


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



		insertId, 







		info;return _regeneratorRuntime.async(function getcodeAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:data = this.get();self = this;client = new _wechatOauth2["default"]('wxa0bb7dd833ca89ce', '45fa8e4a422764b13cd2510b76eeed6b');getAccessToken = think.promisify(client.getAccessToken, client);context$2$0.next = 6;return _regeneratorRuntime.awrap(getAccessToken(data.code));case 6:result = context$2$0.sent;accessToken = result.data.access_token;openid = result.data.openid;getUser = think.promisify(client.getUser, client);context$2$0.next = 12;return _regeneratorRuntime.awrap(getUser(openid));case 12:userInfo = context$2$0.sent;model = self.model('user');res = model.where({ 'user_pass': userInfo.openid }).find();if (!res.id) {insertId = model.add({ user_name: result.nickname, user_pass: result.openid, user_avatar: result.headimgurl });}context$2$0.next = 18;return _regeneratorRuntime.awrap(this.session('userInfo', userInfo));case 18:context$2$0.next = 20;return _regeneratorRuntime.awrap(self.session('userInfo'));case 20:info = context$2$0.sent;
					console.log(info);
					this.redirect('http://www.7758a.com?userInfo=' + info.openid);
					this.success({ 
						userinfo: userInfo });case 24:case "end":return context$2$0.stop();}}, null, this);};_default.prototype.



	userinfoAction = function userinfoAction() {var 

		client, 
		url;return _regeneratorRuntime.async(function userinfoAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:client = new _wechatOauth2["default"]('wxa0bb7dd833ca89ce', '45fa8e4a422764b13cd2510b76eeed6b');url = client.getAuthorizeURL('http://www.7758a.com:1234/admin/user/getcode', 'state', 'snsapi_userinfo');
					this.redirect(url);
					// this.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f3f09b145491ade&redirect_uri=http://www.7758a.com/&response_type=code&scope=snsapi_base&state=123#wechat_redirect')
					this.success(url);case 4:case "end":return context$2$0.stop();}}, null, this);};return _default;})(_baseJs2["default"]);exports["default"] = _default;module.exports = exports["default"]; // let userInfo = await this.session('userInfo');
// if(!userInfo) this.fail('请先关注');
//    let client = new OAuth('wx9f3f09b145491ade', '88e31eaf4afeadbffae3a34c8363bd6a');