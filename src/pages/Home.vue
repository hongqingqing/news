<template>
  <div class="home">
    <div class="home-title">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center" @click="$router.push('/search')">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="right" @click="$router.push('/profile')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <van-tabs v-model="active" sticky animated swipeable @change="onChange">
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="50"
            :immediate-check="false"
          >
            <news-post v-for="post in item.postList" :key="post.id" :post="post"></news-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NewsPost from '../components/NewsPost'
export default {
  name: 'home',
  components: {
    'news-post': NewsPost
  },
  data () {
    return {
      // 默认显示头条栏
      active: localStorage.getItem('token') ? 1 : 0,
      tabList: [],
      id: 999,
      loading: false,
      pageSize: 5,
      refreshing: false
    }
  },
  methods: {
    async getTabList () {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      // debugger
      if (activeList) {
        activeList.forEach(item => {
          item.postList = []
          item.pageIndex = 1
          item.finished = false
        })
        this.tabList = activeList
        console.log(this.tabList)
      } else {
        const res = await this.$axios.get('/category')
        // console.log(res)
        const { data } = res.data
        // console.log(data)
        data.forEach(item => {
        // 每一个tab应该存储自己的pageIndex,pageSize和postList
          item.postList = []
          item.pageIndex = 1
          item.finished = false
        })
        this.tabList = data
      // console.log(this.tabList)
      // this.tabList.forEach(item => {
      //   // 给对象动态添加的属性不是响应式的,需要动态给item添加一个响应式的数据
      //   this.$set(item, 'postList', [])
      // })
      }
    },
    async getPostList () {
      const res = await this.$axios.get('/post', {
        params: {
          category: this.id,
          pageIndex: this.tabList[this.active].pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res)
      const { data } = res.data
      console.log(data)
      this.tabList[this.active].postList = [...this.tabList[this.active].postList, ...data]
      console.log(this.tabList[this.active].postList)
      // 当数据加载完成时
      this.loading = false
      // 把下拉刷新的状态关闭
      setTimeout(() => {
        this.refreshing = false
      }, 3000)
      // 如果没有更多数据,将当前加载页面的finished改成true
      if (data.length < this.pageSize) {
        this.tabList[this.active].finished = true
      }
    },
    // 可以用change事件,也可以通过监听active的变化
    onChange (index) {
      this.loading = true
      // console.log(index)
      this.id = this.tabList[index].id
      // console.log(this.id)
      // 切换分类时,若当前分类下有数据,不需要发请求再获取数据
      if (this.tabList[index].postList.length > 0) {
        return
      }
      this.getPostList()
    },
    onLoad () {
      setTimeout(() => {
        this.tabList[this.active].pageIndex++
        this.getPostList()
      }, 3000)
    },
    onRefresh () {
      console.log('下拉刷新')
      this.loading = true
      this.tabList[this.active].pageIndex = 1
      this.tabList[this.active].postList = []
      this.tabList[this.active].finished = false
      this.getPostList()
    }
  },
  async created () {
    await this.getTabList()
    this.getPostList()
  }
}
</script>

<style lang="scss" scoped>
.home{
  .home-title{
    height: 50px;
    background-color: #FF0000;
    padding: 10px;
    display: flex;
    align-items: center;
    .left{
      i{
        width: 54px;
        font-size: 46px;
        color:#fff
      }
    }
    .center{
      flex:1;
      margin: 0 30px 0 20px;
      background-color: rgba(255,255,255,0.4);
      height: 36px;
      line-height: 36px;
      text-align: center;
      color:#fff;
      border-radius: 18px;
      span{
        margin-left: 4px;
        font-size: 14px;
      }
    }
    .right{
      i{
        width: 32px;
        color: #fff;
        font-size:24px;
      }
    }

  }
}
</style>
