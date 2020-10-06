/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-10-06 19:14:47
 * @FilePath: \demo\server3\token.js
 * @Description: add some description
 */
const jwt = require('jsonwebtoken');
const secret = 'Panda&L';

class JWT {
  constructor() {}

  createToken(payload, time) {
    const token = jwt.sign(payload, secret, {
      expiresIn: time
    })
    return token;
  }

  verifyToken(token, callback) {
    jwt.verify(token, secret, callback);
  }
}

module.exports = new JWT();