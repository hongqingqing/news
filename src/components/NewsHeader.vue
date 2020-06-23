<template>
  <div class="news-header">
    <div class="left" @click="handleClick">
      <i class="iconfont iconjiantou2"></i>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.news-header{
  display: flex;
  height: 50px;
  line-height: 50px;
  text-align: center;
  padding: 0 10px;
  .left,
  .right{
    width: 20px;
  }
  .center{
    flex:1;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
  }
}

</style>
