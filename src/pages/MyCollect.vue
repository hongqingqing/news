<template>
  <div class="my-collect">
    <news-header>我的收藏</news-header>
    <news-post v-for="post in collectList" :key="post.id" :post="post"></news-post>
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
      collectList: []
    }
  },
  methods: {
    async getCollectList () {
      const res = await this.$axios.get('/user_star')
      // console.log(res)
      const { data } = res.data
      console.log(data)
      this.collectList = data
    }
  },
  created () {
    this.getCollectList()
  }
}
</script>

<style lang="scss" scoped>

</style>
