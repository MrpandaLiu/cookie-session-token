/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-10-05 19:00:05
 * @FilePath: \demo\server\db.js
 * @Description: add some description
 */
const {
  hashPassword
} = require('./utils');

const userDB = [{
    account: 'panda',
    pwd: hashPassword('panda', '123456'),
    profile: '喵喵喵喵喵'
  },
  {
    account: 'cat',
    pwd: hashPassword('cat', '19991019'),
    profile: '汪汪汪汪'
  }
];

module.exports = {
  userDB
}