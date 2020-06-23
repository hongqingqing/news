<template>
  <div class="profile">
    <news-header>个人信息</news-header>
    <div class="user-info" @click="edit">
        <div class="avatar">
          <img :src="avatar" alt="" v-show="loading">
        </div>
        <div class="info">
          <p>
            <i class="iconfont" :class="gender"></i>
            <span>{{profile.nickname}}</span>
          </p>
          <p>{{profile.create_date|time}}</p>
        </div>
        <div class="arrow">
          <i class='iconfont iconjiantou1'></i>
        </div>
    </div>
    <div class="list">
      <cell-nav name="我的关注" desc="关注的用户" @click="focus"></cell-nav>
      <cell-nav name="我的跟帖" desc="跟帖/关注" @click="comment"></cell-nav>
      <cell-nav name="我的收藏" desc="文章/视频" @click="$router.push('/my-collect')"></cell-nav>
      <cell-nav name="栏目管理" desc="自定义主页栏目管理" @click="$router.push('/tab-manager')"></cell-nav>
      <cell-nav name="设置" @click="edit"></cell-nav>
      <cell-nav name="退出登录" @click="logout"></cell-nav>
    </div>
  </div>
</template>

<script>
import img from '../1.jpg'
export default {
  data () {
    return {
      profile: {},
      gender: '',
      loading: false
    }
  },
  computed: {
    avatar () {
      if (this.profile.head_img) {
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        return img
      }
    }
  },
  async created () {
    // const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    const res = await this.$axios.get(`/user/${id}`)
    console.log(res)
    this.profile = res.data.data
    this.loading = true
    if (this.profile.gender === 1) {
      this.gender = 'iconxingbienan'
    } else {
      this.gender = 'iconxingbienv'
    }
    console.log(this.profile)
  },
  methods: {
    async logout () {
      // console.log('退出了吗')
      try {
        await this.$dialog.confirm({
          title: '提示消息',
          message: '你确认退出登录吗?'
        })
        // console.log('确认退出')
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        // console.log('取消')
        this.$toast('取消成功')
      }
    },
    edit () {
      // console.log('编辑资料')
      this.$router.push('/edit-profile')
    },
    focus () {
      this.$router.push('/focus')
    },
    comment () {
      this.$router.push('/comment')
    }
  }
}
</script>

<style lang="scss" scoped>
.profile{
  .user-info{
    display: flex;
    padding: 20px;
    align-items: center;
    border-bottom: 3px solid #E4E4E4;
    img{
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
    .info{
      flex:1;
      margin-left: 10px;
      p:first-child{
        font-size: 14px;
        .iconxingbienan{
          color: #78BBEB;
        }
        .iconxingbienv{
          color:pink;
        }
      }
      p:last-child{
        color:#999;
      }
    }
  }
  .list{
    padding-left: 20px;
  }
}
</style>
