<template>
  <div class="register">
    <div class="close" @click="$router.go(-1)">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <news-input type="text" placeholder="用户名/手机号码" v-model="form.username" :rules="/^1\d{4,10}$/" err-msg="输入的用户名或手机号码格式错误"></news-input>
    </div>
    <div class="nickname">
      <news-input type="text" placeholder="昵称" v-model="form.nickname" :rules="/^[\u4e00-\u9fa5]{3,10}$/" err-msg="昵称只能是3-8位中文"></news-input>
    </div>
    <div class="password">
      <news-input type="password" placeholder="请输入密码"
      v-model="form.password" :rules="/^.{3,12}$/" err-msg="输入的密码格式错误"></news-input>
    </div>
    <div class="btn">
      <van-button round size="large" color="#CC3300" @click="register">注册</van-button>
    </div>
    <div class="go-login">
      已有账号?立即<router-link to='/login'>登录</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        nickname: '',
        password: ''
      }
    }
  },
  methods: {
    async register () {
      // if (!this.username || !this.nickname || !this.password) { return }
      const res = await axios.post('http://localhost:3000/register', this.form)
      console.log(res)
      if (res.data.statusCode === 400) {
        this.$toast.fail('用户名已存在')
      } else {
        this.$toast.success('注册成功')
        // 跳转时携带参数过去
        this.$router.push({
          name: 'login',
          params: {
            username: this.form.username,
            password: this.form.password
          }
        })
      }
    }
  }

}
</script>

<style lang='scss' scoped>
  .register{
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
    .btn{
      margin-top: 30px;
    }
    .go-login{
      text-align: center;
      font-size: 16px;
      margin-top: 20px;
    }
  }
</style>
