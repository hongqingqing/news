<template>
  <div class="search">
    <div class="header">
      <i class="iconfont iconjiantou2" @click="back"></i>
      <div class="center">
        <i class="iconfont iconsearch"></i>
        <input type="text" placeholder="请输入搜索关键字" v-model="keyword">
      </div>
      <span @click="search">搜索</span>
    </div>
    <div class="content" v-if="postList.length === 0">
      <div class="title">历史记录</div>
      <ul class="history">
        <li v-for="item in history" :key="item" @click="hotSearch(item)">{{item}}</li>
      </ul>
      <div class="title">热门搜索</div>
      <ul class="hot-search">
        <li v-for="item in hotKeys" :key="item" @click="hotSearch(item)">{{item}}</li>
      </ul>
    </div>
    <div class="post-list" v-else>
        <news-post v-for="item in postList" :key="item.id" :post="item"></news-post>
    </div>

  </div>
</template>

<script>
import NewsPost from '../components/NewsPost'
export default {
  components: {
    'news-post': NewsPost
  },
  data () {
    return {
      keyword: '',
      // 用于存放搜索结果
      postList: [],
      history: JSON.parse(localStorage.getItem('history')) || [],
      hotKeys: ['说好不哭', '王祖贤', '关晓彤']
    }
  },
  methods: {
    async search () {
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword
        }
      })
      const { data } = res.data
      console.log(data)
      this.postList = data
      // 将搜索记录保存在本地
      if (this.keyword) {
        // 存储时先将与当前关键词重复关键词删掉
        this.history = this.history.filter(item => item !== this.keyword)
        this.history.unshift(this.keyword)
        localStorage.setItem('history', JSON.stringify(this.history))
      }
      // this.keyword = ''
    },
    hotSearch (item) {
      // 修改关键字,进行搜索
      this.keyword = item
      this.search()
    },
    back () {
      // 若有搜索关键词,就清掉关键词,否则就返回上一页
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.back()
      }
    }
  },
  watch: {
    // 当输入关键词为空,清除postList数据
    keyword (value) {
      if (value === '') {
        this.postList = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  padding: 5px 10px;
  display: flex;
  // height: 50px;
  align-items: center;
  .center{
    position: relative;
      input{
      width: 250px;
      flex:1;
      border: 1px solid #ccc;
      height: 36px;
      line-height: 34px;
      margin: 0 10px;
      padding-left: 30px;
      border-radius: 19px;
      background-color: #ddd;
    }
    .iconsearch{
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        left: 20px;
      }
  }
}
.content{
  padding:15px;
  .title{
    font-weight:bold;
    font-size:14px;
  }
}
</style>
