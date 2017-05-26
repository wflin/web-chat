/**
 * Created by wang.fulin on 2017/5/25.
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port =  8000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

var numUsers = 0;
var userList = [];

io.on('connection', function (socket) {
  var addedUser = false;

  // 用户登录
  socket.on('login', function (user) {
    console.log("login user："+user);
    socket.username= user;
    userList.push({username:user})
    socket.broadcast.emit('login', {
      username: user
    });
  });

  //群聊消息
  socket.on('group-message', function (data) {
     console.log("group-message");
     console.log(data);
     socket.broadcast.emit('group-message',{
       data
     })
  })
 //私聊
  socket.on("to", function (data) {
    console.log("to");
    console.log(data);
    socket.broadcast.emit('to'+data.touser,{
      data
    })
    socket.emit('to'+data.username,{
      data
    })
  })
  socket.on('disconnect', function () {
     //前端断开时
    console.log("断开："+socket.username)
  })
});
