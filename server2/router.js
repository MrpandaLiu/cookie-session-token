/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-10-06 18:27:07
 * @FilePath: \demo\server2\router.js
 * @Description: add some description
 */
const express = require('express');
const {
  checkAuth,
  checkAccount,
  getUser
} = require('./auth');
const {
  hashPassword
} = require('./utils');

const router = express.Router();

router.all('*', (req, res, next) => {
  /**
   * 配置跨域
   */
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");

  if (req.path === '/login') {
    next();
  } else {
    console.log(req.session);
    const {
      sign,
      name
    } = req.session;
    if (sign && checkAccount(name)) next();
    else res.status(401).send('no session');
  }
});

router.post('/login', (req, res, next) => {
  const {
    account,
    pwd
  } = req.body;
  const password = hashPassword(account, pwd);
  if (checkAuth(account, password)) {
    req.session.sign = true;
    req.session.name = account;
    res.send({
      code: 0,
      msg: '登录成功'
    })
  } else {
    res.send({
      code: 1,
      msg: '登录失败'
    })
  }
})

router.post('/getinfo', (req, res, next) => {
  const account = req.session.name;
  res.send({
    data: getUser(account)
  })
})

module.exports = router;