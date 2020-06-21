<template>
  <div class="news-post" @click="$router.push(`/news-details/${post.id}`)">
    <!-- 视频结构 -->
    <div class="video-post" v-if="post.type === 2">
      <div class="top txt-cut">
        {{post.title}}
      </div>
      <div class="middle">
        <img :src="post.cover[0].url">
        <i class="iconfont iconshipin"></i>
      </div>
      <div class="bottom">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}</span>
      </div>
    </div>
    <!-- 单张图片的结构 -->
    <div class="single-img-post" v-else-if="post.cover.length < 3">
      <div class="left">
        <div class="content txt-cut">
          {{post.title}}
        </div>
        <p>
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}</span>
        </p>
      </div>
      <div class="right">
        <img :src="post.cover[0].url" alt="">
      </div>
    </div>
    <!-- 多张图片的结构 -->
    <div class="multiple-img-post" v-else>
      <div class="top txt-cut">
        {{post.title}}
      </div>
      <div class="middle">
        <img v-for="item in post.cover" :key="item.id" :src="item.url" alt="">
      </div>
      <div class="bottom">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }

}
</script>

<style lang="scss" scoped>
.news-post{
  .video-post{
    border-bottom: 1px solid #ccc;
    padding: 10px;
    .top{
      font-size: 16px;
      color:#000;
    }
    .middle{
      padding: 10px 0;
      position: relative;
      i{
        position: absolute;
        width: 50px;
        height: 50px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: rgba(0,0,0,0.2);
        border-radius: 50%;
        font-size: 48px;
        color:#fff;
        text-align: center;
        line-height: 50px;
      }
    }
    .bottom{
      span{
        font-size: 12px;
        color:#999;
        &:first-child{
          margin-right: 10px;
        }
      }
    }
  }
  .single-img-post{
    border-bottom: 1px solid #ccc;
    padding: 10px;
    display: flex;
    align-items: center;
    .left{
      flex:1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 75px;
      .content{
        font-size: 16px;
        color:#000;
      }
      span{
        color:#999;
        font-size: 12px;
        &:first-child{
          margin-right: 10px;
        }
      }
    }
    .right{
      img{
        width: 121px;
        height: 75px;
        object-fit:cover;
      }
    }
  }
  .multiple-img-post{
    border-bottom: 1px solid #ccc;
    padding: 10px;
    .top{
      font-size: 16px;
      color:#000;
    }
    .middle{
      display: flex;
      padding: 10px 0;
      img{
        width: 33%;
        object-fit:cover;
        &:nth-child(2n){
          margin-left: 3px;
          margin-right: 3px;
        }
      }
    }
    .bottom{
      span{
        font-size: 12px;
        color:#999;
        &:first-child{
          margin-right: 10px;
        }
      }
    }
  }
}

</style>
