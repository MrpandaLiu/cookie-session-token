/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-10-05 22:49:04
 * @FilePath: \demo\server\router.js
 * @Description: add some description
 */
const express = require('express');
const {
  checkAuth,
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
    if (JSON.stringify(req.cookies) === "{}") res.status(401).send('no cookie');
    else {
      const item = req.cookies && req.cookies.account;
      if (checkAuth(item.account, item.password)) next();
      else res.status(401).send('no cookie');
    }
  }
});

router.post('/login', (req, res, next) => {
  const {
    account,
    pwd
  } = req.body;
  const password = hashPassword(account, pwd);
  if (checkAuth(account, password)) {
    res.cookie('account', {
      account,
      password
    }, {
      maxAge: 200000,
    })
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
  const account = req.cookies.account.account;
  res.send({
    data: getUser(account)
  })
})

module.exports = router;