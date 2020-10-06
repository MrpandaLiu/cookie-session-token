/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-10-06 16:30:06
 * @FilePath: \demo\server2\index.js
 * @Description: add some description
 */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const router = require('./router');
const app = express();
const port = 3000;

app.use(cookieParser());

app.use(session({
  secret: "Panda&L", // 设置签名密钥
  name: "sessionid",
  cookie: {
    maxAge: 80 * 10000 // 设置cookie过期时间
  },
  resave: true, // 强制保存，如果session没有被修改也要重新保存
  saveUninitialized: false // 无论有没有session cookie，每次请求都设置个session cookie 
}));

app.options('*', function (req, res) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.sendStatus(200);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(router);


app.listen(port, () => console.log(`app listening on port ${port}!`))