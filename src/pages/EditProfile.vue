<template>
  <div class="edit-profile">
    <news-header>编辑资料</news-header>
    <div class="avatar">
      <img v-show="loading" :src="avatar" alt="">
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="list">
      <cell-nav name="昵称" :desc="profile.nickname" @click="showNickname"></cell-nav>
      <cell-nav name="密码" desc="******" @click="showPassword"></cell-nav>
      <cell-nav name="性别" :desc="sex" @click="showGender"></cell-nav>
    </div>

    <!-- 提供用于修改昵称的对话框 -->
    <van-dialog v-model="isShowNickName" title="修改昵称" show-cancel-button @confirm="editNickName">
        <van-field  v-model="nickname"/>
    </van-dialog>

    <!-- 提供用于修改密码的对话框 -->
    <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm="editPassword" >
        <van-field  v-model="password"/>
    </van-dialog>

    <!-- 提供用于修改性别的对话框 -->
    <!-- <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm='editGender'>
      <van-radio-group v-model="gender">
        <van-radio :name="1">男</van-radio>
        <van-radio :name="0">女</van-radio>
      </van-radio-group>
    </van-dialog> -->
    <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm='editGender'>
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import img from '../1.jpg'
export default {
  data () {
    return {
      profile: {},
      loading: false,
      isShowNickName: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 0
    }
  },
  computed: {
    sex () {
      return this.profile.gender === 1 ? '男' : '女'
    },
    avatar () {
      if (this.profile.head_img) {
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        return img
      }
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    // 渲染功能封装
    async getProfile () {
      const id = localStorage.getItem('id')
      const res = await this.$axios.get(`/user/${id}`)
      // console.log(res)
      this.profile = res.data.data
      this.loading = true
      // console.log(this.profile)
    },
    // 修改功能封装
    async editProfile (data) {
      const id = localStorage.getItem('id')
      const res = await this.$axios.post(`/user_update/${id}`, data)
      console.log(res)
      if (res.data.message === '修改成功') {
        // 重新渲染当前页面
        this.getProfile()
        this.$toast.success('修改成功!')
      }
    },
    showNickname () {
      // console.log('修改昵称')
      this.isShowNickName = true
      this.nickname = this.profile.nickname
    },
    editNickName () {
      // console.log('修改昵称')
      this.editProfile({ nickname: this.nickname })
    },
    showPassword () {
      this.isShowPassword = true
      this.password = this.profile.password
    },
    editPassword () {
      this.editProfile({ password: this.password })
    },
    showGender () {
      this.isShowGender = true
      this.gender = this.profile.gender
    },
    editGender () {
      // console.log('修改性别')
      this.editProfile({ gender: this.gender })
    },
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      // formdate对象用于上传文件
      const fd = new FormData()
      // 给fd添加数据
      fd.append('file', file.file)
      // 发请求上传文件
      const res = await this.$axios.post('/upload', fd)
      if (res.data.message === '文件上传成功') {
        // console.log(res.data.data.url)
        // 发请求重新渲染
        this.editProfile({ head_img: res.data.data.url })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-profile{
  .avatar{
    padding-top: 50px;
    position: relative;
    img{
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin: 0 auto;
    }
    .van-uploader{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 50px;
      opacity: 0;
    }
  }
  .list{
    margin-top: 50px;
    padding-left: 15px;
  }
  .van-dialog{
    padding: 0 10px 0 10px;
    .van-field{
      margin-top: 10px;
      border: 1px solid #ccc;
    }
  }

}
</style>
