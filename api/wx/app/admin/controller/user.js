"use strict";var _inherits = require("babel-runtime/helpers/inherits")["default"];var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];exports.__esModule = true;var _baseJs = require(

"./base.js");var _baseJs2 = _interopRequireDefault(_baseJs);var _wechatOauth = require(
'wechat-oauth');var _wechatOauth2 = _interopRequireDefault(_wechatOauth);var _default = (function (_Base) {_inherits(_default, _Base);function _default() {_classCallCheck(this, _default);_Base.apply(this, arguments);}



	/**
  * index action
  * @return {Promise} []
  */_default.prototype.
	addAction = function addAction() {var 
		data, 
		model, 
		user_id, 






		userInfo;return _regeneratorRuntime.async(function addAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:data = this.post();model = this.model('user');context$2$0.next = 4;return _regeneratorRuntime.awrap(model.add({ user_name: 'test' + Math.ceil(Math.random() * 100), user_pass: 'testpass', user_score: Math.ceil(Math.random() * 100), user_avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1032584925,2843115905&fm=58' }));case 4:user_id = context$2$0.sent;context$2$0.next = 7;return _regeneratorRuntime.awrap(model.where({ 
						id: user_id }).
					find());case 7:userInfo = context$2$0.sent;context$2$0.next = 10;return _regeneratorRuntime.awrap(

					this.session(userInfo, userInfo));case 10:return context$2$0.abrupt("return", 
					this.success({ 
						userInfo: userInfo }));case 11:case "end":return context$2$0.stop();}}, null, this);};_default.prototype.



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
		userInfo, 


		model, 

		info, 




		datas;return _regeneratorRuntime.async(function scoreAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:data = this.post();context$2$0.next = 3;return _regeneratorRuntime.awrap(this.session('userInfo'));case 3:userInfo = context$2$0.sent;context$2$0.next = 6;return _regeneratorRuntime.awrap(think.isNumber(data.score * 1));case 6:if (context$2$0.sent) {context$2$0.next = 8;break;}this.fail('参数不正确');case 8:model = this.model('user');if (!data.type) {context$2$0.next = 14;break;}context$2$0.next = 12;return _regeneratorRuntime.awrap(model.where({ id: 50 }).find());case 12:info = context$2$0.sent;data.score += info.user_score;case 14:context$2$0.next = 16;return _regeneratorRuntime.awrap(model.where({ 
						id: 50 }).
					update({ 
						user_score: data.score }));case 16:datas = context$2$0.sent;

					this.success('记分成功');case 18:case "end":return context$2$0.stop();}}, null, this);};_default.prototype.


	getcodeAction = function getcodeAction() {var 
		data, 
		client, 
		openid, 
		userInfo;return _regeneratorRuntime.async(function getcodeAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:data = this.get();client = new _wechatOauth2["default"]('wxa0bb7dd833ca89ce', '45fa8e4a422764b13cd2510b76eeed6b');openid = undefined;userInfo = undefined;context$2$0.next = 6;return _regeneratorRuntime.awrap(
					client.getAccessToken(data.code, function (err, result) {
						var accessToken = result.data.access_token;
						openid = result.data.openid;
						console.log(result);
						client.getUser(openid, function (err, result) {
							userInfo = result;
							think.session = userInfo;});}));case 6:


					this.redirect('http://www.7758a.com');
					this.success({ userinfo: userInfo });case 8:case "end":return context$2$0.stop();}}, null, this);};_default.prototype.


	userinfoAction = function userinfoAction() {var 
		client, 
		url;return _regeneratorRuntime.async(function userinfoAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:client = new _wechatOauth2["default"]('wxa0bb7dd833ca89ce', '45fa8e4a422764b13cd2510b76eeed6b');url = client.getAuthorizeURL('http://www.7758a.com:1234/admin/user/getcode', 'state', 'snsapi_base');
					this.redirect(url);
					// this.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f3f09b145491ade&redirect_uri=http://www.7758a.com/&response_type=code&scope=snsapi_base&state=123#wechat_redirect')
					this.success(url);case 4:case "end":return context$2$0.stop();}}, null, this);};return _default;})(_baseJs2["default"]);exports["default"] = _default;module.exports = exports["default"]; // if(!userInfo) this.fail('请先关注');