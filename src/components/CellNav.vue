<template>
  <div class="cell-nav" @click="handleClick">
    <div class="item">
        <div class="left">{{name}}</div>
        <div class="center">{{desc}}</div>
        <div class="right">
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.cell-nav{
  .item{
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #E4E4E4;
      display: flex;
      .left{
        font-size: 14px;
        color: #000;
      }
      .center{
        flex: 1;
        text-align: right;
      }
      .right,
      .center{
        color: #999;
        margin-right: 10px;
      }
  }
}
</style>
