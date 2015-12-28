"use strict";

import Base from "./base.js";
import OAuth from 'wechat-oauth';

var path = require('path');
var signature = require('./signature');
var config = require('./config')();


var createSignature = signature.getSignature(config);


export default class extends Base {
	async sdkconfigAction(){
	    // var url = req.body.url;
	    // console.log(this.referrer() , this.ip())
	    let url = await this.referrer();
	    // console.log(url);
	    let self = this;
	    createSignature(url, function(error, result) {
	        if (error) {
				self.fail(error)
	        } else {
	            // res.json();
	            self.success(result)
	        }
	    });
		
	}
}