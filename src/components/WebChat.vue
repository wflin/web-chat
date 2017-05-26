<template>
  <div>
    <el-row>
      <h1>基于WebSocket的实时聊天系统</h1>
      <small>{{selfuser}}</small>
    </el-row>
     <el-row>
       <el-col :offset="2" :span="4" class="user-box">
           <md-list>
             <div v-for="user in userList"  @click="selectUser(user)">
               <md-list-item v-if="user.type=='group'" class="group_chat">

                   <md-avatar>
                     <img src="../assets/image/3.jpg" alt="People">
                   </md-avatar>
                   <md-button class="md-icon-button md-list-action">
                     <md-icon class="md-primary">群聊</md-icon>
                   </md-button>

               </md-list-item>
               <md-list-item v-else class="user-single-box" >

                   <md-avatar>
                     <img src="../assets/image/1.jpg" alt="People">
                   </md-avatar>
                   <md-button class="md-icon-button md-list-action">
                     <md-icon class="md-primary">{{user.name}}</md-icon>
                   </md-button>

               </md-list-item>
             </div>
           </md-list>
       </el-col>
       <el-col :span="16" class="chat-box">
         <el-row class="chat-box-title">
           <div v-if="touser==''">
               <md-avatar>
                 <img src="../assets/image/3.jpg" alt="People">
               </md-avatar>
               正在群聊
           </div>
           <div v-else>
               <md-avatar>
                 <img src="../assets/image/1.jpg" alt="People">
               </md-avatar>
               正在与【{{touser}}】聊天
           </div>

         </el-row>
         <el-row class="chat-box-main">
           <md-list>
             <div v-for="msg in messageList">
               <md-list-item  class="user-single-box">
                 <md-avatar>
                   <img src="../assets/image/1.jpg" alt="People">
                 </md-avatar>
                 <span style="color: darkcyan;font-style: oblique">{{msg.data.username}}</span>
                 <span style="color: darkblue;font-style: italic">{{msg.data.message}}</span>
               </md-list-item>
             </div>
           </md-list>
         </el-row>
         <el-row class="chat-box-input">
           <el-col :span="21">
             <md-input-container>
               <label>请输入发送的内容</label>
               <md-input maxlength="50" style="font-size: 24px;" v-model="message"></md-input>
               <!-- <md-textarea maxlength="50"></md-textarea>-->
               <!-- <md-button class="md-raised md-primary">发送</md-button>-->
             </md-input-container>
           </el-col>
           <el-col :span="3">
              <el-button type="info" style="margin-top: 15px" @click="sendMessage">发送</el-button>
           </el-col>
         </el-row>
       </el-col>
     </el-row>
  </div>
</template>

<script>
  import socket from '../socket'
  export default {
  data () {
    return {
        message: '',
        userList:[{name:"群聊",type: 'group'}],
        messageList:[],
        touser:'',
        selfuser:this.$route.params.user
    }
  },
  mounted:function () {
      var _self = this;
      //先请求得到所有在线的用户
      socket.on("login", function (user) {
        _self.userList.push({name:user.username,type:'other'})
      })
      //群聊
      socket.on("group-message", function (data) {
        _self.messageList.push(data)
        for (var i=0;i<_self.userList.length;i++){
            if (_self.userList[i].name===data.data.username){
                return;
            }
        }
        _self.userList.push({name:data.data.username,type:'other'})
      })
    //私聊
    socket.on("to"+ _self.$route.params.user,function (data) {
      _self.messageList.push(data)
    })
  },
  methods:{
      sendMessage: function (type) {
        var _self=this;
        if (_self.touser==''){
          //广播不会发给自己
          _self.messageList.push({data:{
            username: _self.$route.params.user,
            message: _self.message
          }
          })
          socket.emit('group-message', {
            username: _self.$route.params.user,
            message: _self.message
          });
        }else{
          socket.emit('to', {
              touser: _self.touser,
            username: _self.$route.params.user,
            message: _self.message
          });
        }
        _self.message='';
      },
    selectUser: function (user) {
      if (user.type=='group'){
          this.touser = '';
          return;
      }
      this.touser = user.name;
      this.messageList = [];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .user-box{
     border: 2px solid silver;
    height: 600px;
  }
  .chat-box{
    border: 2px solid silver;
    height: 600px;
  }
  .user-single-box{
     border-bottom: 1px solid silver;
  }
  .group_chat{
    border-bottom: 1px solid darkred;
    background-color: antiquewhite;
  }
  .chat-box-title{
    height: 40px;
    background-color: silver;
  }
  .chat-box-main{
    height: 480px;
    border: 1px solid silver;
    overflow: auto;
  }
  .chat-box-input{
    height: 50px;
    background-color: lavender;
    border: 1px solid silver;
  }
  .selecteduser{
    background-color: antiquewhite;
  }
</style>
