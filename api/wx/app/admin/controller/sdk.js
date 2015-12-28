"use strict";var _inherits = require("babel-runtime/helpers/inherits")["default"];var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];exports.__esModule = true;var _baseJs = require(

"./base.js");var _baseJs2 = _interopRequireDefault(_baseJs);var _wechatOauth = require(
'wechat-oauth');var _wechatOauth2 = _interopRequireDefault(_wechatOauth);

var path = require('path');
var signature = require('./signature');
var config = require('./config')();


var createSignature = signature.getSignature(config);var _default = (function (_Base) {_inherits(_default, _Base);function _default() {_classCallCheck(this, _default);_Base.apply(this, arguments);}_default.prototype.



	sdkconfigAction = function sdkconfigAction() {var 


		url, 

		self;return _regeneratorRuntime.async(function sdkconfigAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:context$2$0.next = 2;return _regeneratorRuntime.awrap(this.referrer());case 2:url = context$2$0.sent;self = this;
					createSignature(url, function (error, result) {
						if (error) {
							self.fail(error);} else 
						{
							// res.json();
							self.success(result);}});case 5:case "end":return context$2$0.stop();}}, null, this);};return _default;})(_baseJs2["default"]);exports["default"] = _default;module.exports = exports["default"]; // var url = req.body.url;
// console.log(this.referrer() , this.ip())
// console.log(url);