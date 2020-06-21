<template>
  <div class="news-details">
    <div class="header">
      <div class="left">
        <i class="iconfont iconjiantou2" @click="$router.go(-1)"></i>
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div class="btn-followed" v-if="details.has_follow" @click="unfollow(details.user.id)">已关注</div>
        <div class="btn-follow" v-else @click="follow(details.user.id)">关注</div>
      </div>
    </div>
    <div class="content">
      <div class="title txt-cut">
        {{details.title}}
      </div>
      <div class="tips">
        <span>{{details.user.nickname}}</span>
        <span>{{details.create_date|time}}</span>
      </div>
      <div class="video" v-if="details.type === 2">
        <video :src="details.content" controls></video>
      </div>
      <div class="info" v-else v-html="details.content"></div>
      <div class="icon">
        <div class="left" @click="like(details.id)" :class="{like:details.has_like}">
          <i class="iconfont icondianzan"></i>
          <i>{{details.like_length}}</i>
        </div>
        <div class="right">
          <i class="iconfont iconweixin"></i>
          <i>微信</i>
        </div>
      </div>
    </div>

    <!-- 评论区域 -->
    <div class="comment">
      <div class="title">精彩跟帖</div>
      <news-comment v-for="item in commentList" :key="item.id" :comment="item"></news-comment>
    </div>

    <div class="footer">
      <div class="comment-input" v-if="isShowInput">
        <input type="text" placeholder="写跟帖" @focus="showTextarea">
        <div class="icon-comment">
          <i class="iconfont iconpinglun-"></i>
          <span class="num">{{details.comment_length}}</span>
        </div>
        <i class="iconfont iconshoucang" @click="collect(details.id)" :class="{collect:details.has_star}"></i>
        <i class="iconfont iconfenxiang"></i>
      </div>
      <div class="comment-taxtarea" v-else>
        <textarea ref="textarea" placeholder="回复" @blur="showInput($event)"></textarea>
        <div class="send">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsComment from '../components/NewsComment'
export default {
  components: {
    'news-comment': NewsComment
  },
  data () {
    return {
      details: {
        user: {}
      },
      isShowInput: true,
      commentList: {}
    }
  },
  methods: {
    async getPostDetails () {
      const id = this.$route.params.id
      // console.log(id)
      const res = await this.$axios.get(`/post/${id}`)
      // console.log(res)
      const { data } = res.data
      // console.log(data)
      this.details = data
      // console.log(this.details)
    },
    async getCommentList () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { data } = res.data
      // console.log(data)
      this.commentList = data
    },
    async follow (id) {
      // console.log(id)
      // 点击时发送请求
      await this.$axios.get(`/user_follows/${id}`)
      // console.log(res)
      // 重新渲染
      this.getPostDetails()
    },
    async unfollow (id) {
      // console.log(id)
      // 点击时发送请求
      await this.$axios.get(`/user_unfollow/${id}`)
      // console.log(res)
      // 重新渲染
      this.getPostDetails()
    },
    async like (id) {
      // console.log(id)
      await this.$axios.get(`/post_like/${id}`)
      // console.log(res)
      this.getPostDetails()
    },
    async showTextarea () {
      this.isShowInput = false
      // 获取到textarea,调用focus方法即可
      // DOM异步更新的问题
      await this.$nextTick()
      // console.log(this.$refs.textarea)
      // 自动获取焦点,获取到textarea,调用focus方法即可
      this.$refs.textarea.focus()
    },
    showInput () {
      this.isShowInput = true
    },
    async collect (id) {
      console.log('收藏的文章', id)
      await this.$axios.get(`/post_star/${id}`)
      this.getPostDetails()
    }
  },
  watch: {
    $route () {
      // 监听路由的变化,如果路由改变,就重新发请求
      this.getPostDetails()
    }
  },
  created () {
    this.getPostDetails()
    this.getCommentList()
  }
}
</script>

<style lang="scss" scoped>
.news-details{
  padding-bottom: 100px;
  .header{
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .left{
      display: flex;
      align-items: center;
      .iconnew{
        font-size: 48px;
      }
    }
    .right{
      .btn-followed,
      .btn-follow{
        border: 1px solid #ccc;
        width: 56px;
        height: 24px;
        line-height: 24px;
        border-radius: 12px;
        text-align: center;
      }
      .btn-follow{
        background-color: #FF0000;
        border: 1px solid #FF0000;
        color:#fff
      }
    }
  }
  .content{
    padding: 15px;
    border-bottom: 3px solid #ccc;
    .title{
      font-size: 16px;
      color:#000;
      font-weight:700
    }
    .tips{
      font-size: 12px;
      color:#ccc;
      span:first-child{
        margin-right: 10px;
      }
    }
    .info{
      font-size: 12px;
      margin: 15px 0 30px 0;
    }
    video{
      width: 100%;
      margin: 15px 0 30px 0;
    }
    .icon{
      display: flex;
      justify-content: space-evenly;
      .left,
      .right{
        width: 80px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #cccccc;
        border-radius: 15px;
        text-align: center;
        i{
          margin-right: 5px;
        }
        .iconweixin{
          color: #42D342;
        }
      }
      .like{
        color: red;
        border-color:red
      }
    }
  }
  .comment{
    .title{
      font-size: 18px;
      text-align: center;
      padding: 10px 0;
    }
  }
  .footer{
    background-color: #ffffff;
    width: 100%;
    position:fixed;
    left: 0;
    bottom: 0;
    padding: 10px;
    align-items: center;
    .comment-input{
      display:flex;
      justify-content: space-evenly;
      input{
            width: 180px;
            height: 30px;
            background-color: #ddd;
            border-radius: 15px;
            padding-left: 20px;
          }
      .iconfont{
        font-size: 24px;
      }
      .collect{
          color: red;
      }
      .icon-comment{
        position: relative;
        .num{
          position: absolute;
          background-color: red;
          height: 20px;
          line-height: 20px;
          color:#fff;
          padding: 0 10px;
          border-radius: 10px;
          right: -20px;
          top: -4px;
        }
      }
    }
    .comment-taxtarea{
      display: flex;
      align-items:flex-end;
      textarea{
        flex:1;
        height: 60px;
        border-radius: 5px;
        background-color: #D7D7D7;
        padding: 5px 10px;
      }
      .send{
        height: 20px;
        line-height: 20px;
        background-color: red;
        color:#fff;
        font-size: 12px;
        padding: 0 20px;
        border-radius: 10px;
        margin-left: 20px;
      }
    }
  }
}
</style>
