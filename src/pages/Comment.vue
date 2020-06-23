<template>
  <div class="comment">
    <news-header>我的跟帖</news-header>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      :offset="50"
    >
  <div class="item" v-for="item in commentList" :key="item.id">
      <div class="time">{{item.create_date|time('YYYY-MM-DD HH:mm')}}</div>
      <!-- 父级跟帖数据 -->
      <div class="parent" v-if="item.parent">
        <p>回复： {{item.parent.user.nickname}}</p>
        <p>{{item.parent.content}}</p>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="origin">
        <span class="one-txt-cut">原文：{{item.post.title}}</span>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
</van-list>

  </div>
</template>

<script>
export default {
  data () {
    return {
      commentList: [],
      pageIndex: 1,
      pageSize: 4,
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res)
      const { data } = res.data
      this.commentList = [...this.commentList, ...data]
      console.log(this.commentList)

      // 当数据加载完成时
      this.loading = false
      // 如果没有更多数据,需要将finished改成true
      if (data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad () {
      setTimeout(() => {
        this.pageIndex++
        this.getCommentList()
      }, 1000)
    }
  },
  created () {
    this.getCommentList()
  }
}
</script>

<style lang="scss" scoped>
.comment{
  .item {
    border-bottom: 1px solid #ccc;
    padding: 15px;
    font-size: 14px;
    line-height: 30px;
    .content {
      color: #000;
    }
    .time {
      color: #888;
    }
    .origin {
      color: #888;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      .one-text-cut {
        flex: 1;
      }
    }
    .parent {
      margin: 10px 0;
      background-color: #ddd;
      padding: 10px;
      border-radius: 5px;
      p:first-child {
        font-size: 12px;
      }
    }
  }
}
</style>
