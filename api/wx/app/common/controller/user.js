"use strict";var _inherits = require("babel-runtime/helpers/inherits")["default"];var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];exports.__esModule = true;var _baseJs = require(

"./base.js");var _baseJs2 = _interopRequireDefault(_baseJs);var _default = (function (_Base) {_inherits(_default, _Base);function _default() {_classCallCheck(this, _default);_Base.apply(this, arguments);}


  /**
   * index action
   * @return {Promise} []
   */_default.prototype.
  addAction = function addAction() {var 
    model, 
    data;return _regeneratorRuntime.async(function addAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:model = this.model("user");context$2$0.next = 3;return _regeneratorRuntime.awrap(model.select());case 3:data = context$2$0.sent;return context$2$0.abrupt("return", 
          this.success(data));case 5:case "end":return context$2$0.stop();}}, null, this);};return _default;})(_baseJs2["default"]);exports["default"] = _default;module.exports = exports["default"];