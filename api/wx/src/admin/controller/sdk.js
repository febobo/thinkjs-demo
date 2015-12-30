"use strict";

import Base from "./base.js";
import OAuth from 'wechat-oauth';

var path = require('path');
var signature = require('./signature');
var config = require('./config')();


var createSignature = signature.getSignature(config);


export default class extends Base {
	async sdkconfigAction(){
            let countModel = await this.model('count');
            //let count = await countModel.add({view_count : 0 , comments_count : 0 , join_count : 0});
            let tj = await countModel.where({id : 1 }).find();
            await countModel.where({id : 1 }).update({join_count : ++tj.join_count  });
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
