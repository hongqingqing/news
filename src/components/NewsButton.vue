<template>
  <div class="news_button" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }

}
</script>

<style lang="scss" scoped>
.news_button{
  width: 100%;
  height: 48px;
  background-color: #CC3300;
  border-radius: 24px;
  text-align: center;
  line-height: 48px;
  font-size: 18px;
  color:#F8E4DD;
}

</style>
