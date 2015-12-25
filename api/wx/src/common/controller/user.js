"use strict";

import Base from "./base.js";

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async addAction(){
    let model = this.model("user");
    let data = await model.select();
    return this.success(data);
  }
}