<template>
  <div class="news-comment">
    <div class="title">
      <img :src="avatar" alt="">
      <div class="info">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date|time}}</div>
      </div>
      <div class="reply">回复</div>
    </div>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
import img from '../1.jpg'
export default {
  props: {
    comment: Object
  },
  computed: {
    avatar () {
      if (this.comment.user.head_img) {
        return this.$axios.defaults.baseURL + this.comment.user.head_img
      } else {
        return img
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.news-comment{
  padding: 10px;
  border-bottom:1px solid #ccc;
  .title{
    display: flex;
    img{
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
    .info{
      flex:1;
      margin-left: 10px;
      .name{
        color:#000;
        font-size:14px;
      }
      .time{
        color:#ccc;
      }
    }
    .reply{
      color:#ccc;
    }
  }
  .content{
    padding-top: 10px;
    font-size:14px
  }
}
</style>
