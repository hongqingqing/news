<template>
  <div class="cell-focus">
    <div class="list" v-for="item in followList" :key="item.id">
      <div class="left">
        <img :src="$axios.defaults.baseURL+item.head_img" alt="">
      </div>
      <div class="center">
        <p>{{item.nickname}}</p>
        <p>{{item.create_date|time}}</p>
      </div>
      <div class="right" @click="cancelFollow(item.id)">
        <van-button type="default" round size="small" color="#E1E1E1">取消关注</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      followList: []
    }
  },
  methods: {
    // 关注用户列表渲染
    async getFollowList () {
      const res = await this.$axios.get('/user_follows')
      // console.log(res.data.data)
      this.followList = res.data.data
    },
    async cancelFollow (id) {
      // console.log(id)
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '你确认取消关注该用户吗?'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        // console.log(res)
        if (res.data.message === '取消关注成功') {
          this.getFollowList()
          this.$toast.success('取消关注成功')
        }
      } catch {
        // this.$toast('取消成功')
      }
    },
    async follow (id) {
      const res = await this.$axios.get(`/user_follows/${id}`)
      // console.log(res)
      if (res.data.message === '关注成功') {
        this.getFollowList()
        this.$toast.success('关注成功')
      }
    }
  },
  async created () {
    this.getFollowList()
  }

}
</script>

<style lang='scss' scoped>
.list{
  display: flex;
  padding: 0 20px 0 20px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  height: 90px;
  .left{
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .center{
    flex:1;
    margin-left: 10px;
    font-size: 14px;
  }
  .right{
    .van-button{
      width: 80px;
      font-size: 12px;
    }
  }
}
</style>
