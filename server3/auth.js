/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-10-06 16:41:48
 * @FilePath: \demo\server2\auth.js
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

const checkAccount = (account) => {
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
  checkAccount,
  getUser
}