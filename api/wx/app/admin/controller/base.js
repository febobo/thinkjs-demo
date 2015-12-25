'use strict';var _inherits = require('babel-runtime/helpers/inherits')['default'];var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];exports.__esModule = true;var _default = (function (_think$controller$base) {_inherits(_default, _think$controller$base);function _default() {_classCallCheck(this, _default);_think$controller$base.apply(this, arguments);}


     /**
      * some base method in here
      */_default.prototype.
     __before = function __before() {var 

          allowAccessOrigin;return _regeneratorRuntime.async(function __before$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:allowAccessOrigin = this.http.headers.origin;

                         this.header('Access-Control-Allow-Origin', allowAccessOrigin);
                         this.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
                         this.header('Access-Control-Allow-Credentials', 'true');
                         this.header('Content-Type', 'application/json');case 5:case 'end':return context$2$0.stop();}}, null, this);};return _default;})(think.controller.base);exports['default'] = _default;module.exports = exports['default'];