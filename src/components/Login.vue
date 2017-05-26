<template>
  <div>
    <ul class="pages">
      <li class="chat page">
        <div class="chatArea">
          <ul class="messages"></ul>
        </div>
        <input class="inputMessage" placeholder="Type here..."/>
      </li>
      <li class="login page">
        <div class="form">
          <h3 class="title">请输入您的昵称</h3>
          <input class="usernameInput" type="text" maxlength="14" v-model="userName"  @keyup.enter="connectServer"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import socket from '../socket'
  export default {
  data () {
    return {
       userName: ''
    }
  },
  methods:{
      connectServer: function () {
          var _self = this;
        socket.emit('login', this.userName);
         this.$router.push({name:"WebChat",params:{
             user:_self.userName
         }})
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
