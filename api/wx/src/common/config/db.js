'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  host: '123.56.129.175',
  port: '',
  name: 'wx_activity',
  user: 'root',
  pwd: 'root',
  prefix: 'think_',
  encoding: 'utf8',
  nums_per_page: 10,
  log_sql: true,
  log_connect: true,
  cache: {
    on: true,
    type: '',
    timeout: 3600
  },
  adapter: {
    mysql: {},
    mongo: {}
  }
};