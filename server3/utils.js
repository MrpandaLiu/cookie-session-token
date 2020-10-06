/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-10-05 18:00:04
 * @FilePath: \demo\server\utils.js
 * @Description: add some description
 */
const cryto = require('crypto');

const hashPassword = (name, pwd) => {
  const hash = cryto.createHash('md5');
  hash.update(name + pwd);
  return hash.digest('hex');
}

module.exports = {
  hashPassword
}