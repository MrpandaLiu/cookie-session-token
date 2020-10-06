/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-10-05 22:09:07
 * @FilePath: \demo\server\auth.js
 * @Description: add some description
 */
const {
  userDB
} = require('./db');

const checkAuth = (account, pwd) => {
  return userDB.some((item) => {
    return (item.account === account && item.pwd === pwd);
  })
}

const getUser = (account) => {
  for (let i = 0; i < userDB.length; i++) {
    if (account === userDB[i].account) return userDB[i];
  }
}

module.exports = {
  checkAuth,
  getUser
}