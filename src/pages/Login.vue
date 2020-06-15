<template>
  <div class="login">
    <div class="close">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <news-input type="text" placeholder="请输入用户名" v-model="username" :rules="/^1\d{4,10}$/" err-msg="输入的用户名格式错误"></news-input>
    </div>
    <div class="password">
      <news-input type="password" placeholder="请输入密码"
      v-model="password" :rules="/^.{3,12}$/" err-msg="输入的密码格式错误"></news-input>
    </div>
    <div class="button">
      <van-button @click="login" round size="large" color="#CC3300">登录</van-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NewsInput from '../components/NewsInput'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    'news-input': NewsInput
  },
  methods: {
    async login () {
      // console.log('登录么')
      if (!this.username || !this.password) return
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      console.log(res)
      if (res.data.statusCode === 401) {
        this.$toast.fail('用户名或密码错误!')
      } else {
        this.$toast.success('登录成功!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  padding:20px;
  .close{
    i{
      font-size: 27px;
    }
  }
  .logo{
    text-align: center;
    i{
      color:#D81E06;
      font-size: 126px;
    }
  }
  .button{
    margin-top: 40px;
  }
}

</style>
