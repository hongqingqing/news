<template>
  <div class="login">
    <div class="close" @click="$router.go(-1)">
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
    <div class="go-register">
      没有账号?去<router-link to='/register'>注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      // console.log('登录么')
      if (!this.username || !this.password) return
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      console.log(res)
      if (res.data.statusCode === 401) {
        this.$toast.fail('用户名或密码错误!')
      } else {
        this.$toast.success('登录成功!')
        // 登录成功时保存token和用户id
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('id', user.id)
        this.$router.push('/profile')
      }
    }
  },
  created () {
    console.log(this.$route)
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
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
  .go-register{
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
  }
}

</style>
