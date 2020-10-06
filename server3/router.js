/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-10-06 19:03:35
 * @FilePath: \demo\server3\router.js
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
const jwt = require('./token');

const router = express.Router();

router.all('*', (req, res, next) => {
  /**
   * 配置跨域
   */
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Expose-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");

  if (req.path === '/login') {
    next();
  } else {
    const token = req.headers.authorization;
    jwt.verifyToken(token, (err, decode) => {
      if (err) res.status(401).send('error token');
      else next();
    });
  }
});

router.post('/login', (req, res, next) => {
  const {
    account,
    pwd
  } = req.body;
  const password = hashPassword(account, pwd);
  if (checkAuth(account, password)) {
    const payload = {
      account
    }
    const token = jwt.createToken(payload, '1h');
    console.log(token);
    res.header('Authorization', token);
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
  const token = req.headers.authorization;
  jwt.verifyToken(token, (err, decode) => {
    if (err) res.status(401).send('error token');
    else {
      console.log(decode);
      res.send({
        data: getUser(decode.account)
      })
    }
  });
})

module.exports = router;